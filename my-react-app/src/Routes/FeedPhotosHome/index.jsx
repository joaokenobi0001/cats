import React, { useCallback, useEffect, useState } from 'react';
import { fetchCatImages } from '../../api/cats';
import ErrorMsg from '../../Components/ErrorMsg';
import FeedPhotosItemHome from '../../Components/FeedPhotosItemHome';
import Loading from '../../Components/Loading';
import useFetch from '../../Utils/useFetch';
import '../FeedPhotosHome/style.css';

function FeedPhotos({ setModalPhoto }) {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const { loading, error, request } = useFetch();
  const [hasMore, setHasMore] = useState(true);
  const [apiType] = useState('cats');

  useEffect(() => {
    if (apiType === 'cats') {
      async function fetchPhotos() {
        const total = 3;
        const { url, options } = fetchCatImages(page, total);
        const { response, json } = await request(url, options);

        if (response && response.ok) {
          setPhotos((prevPhotos) => [...prevPhotos, ...json]);
          if (json.length < total) setHasMore(false);
        } else {
          setHasMore(false);
        }
      }
      fetchPhotos();
    }
  }, [page, request, apiType]);

  const handleScroll = useCallback(() => {
    if (
      apiType === 'cats' &&
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 200 &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading, apiType]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Divide as fotos em grupos de três para garantir que cada linha tenha 100vh
  const photoGroups = [];
  for (let i = 0; i < photos.length; i += 3) {
    photoGroups.push(photos.slice(i, i + 3));
  }

  if (error) return <ErrorMsg error={error} />;
  if (loading && page === 1) return <Loading />;

  return (
    <div className="feed-photos-list-home">
      {photoGroups.map((group, index) => (
        <div key={index} className="feed-photos-row">
          {group.map((photo) => (
            <FeedPhotosItemHome 
              photo={photo}
              key={photo.id}
              setModalPhoto={setModalPhoto}
            />
          ))}
        </div>
      ))}
      {loading && <Loading />}
    </div>
  );
}

export default FeedPhotos;
