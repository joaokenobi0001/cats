import React, { useCallback, useEffect, useState } from 'react';
import { fetchCatImages } from '../../api/api'; // Importando a função
import ErrorMsg from '../../Components/ErrorMsg';
import FeedPhotosItem from '../../Components/FeedPhotosItem';
import Loading from '../../Components/Loading';
import useFetch from '../../Utils/useFetch'; // Importando o hook useFetch
import './style.css';

function FeedPhotos({ setModalPhoto, setInfinite }) {
  const [page, setPage] = useState(1);
  const { data, loading, error, request } = useFetch();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      const total = 3;
      const { url, options } = fetchCatImages(page, total);
      const { response, json } = await request(url, options);

      if (response && response.ok) {
        if (json.length < total) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    }

    fetchPhotos();
  }, [page, request]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 200 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (error) return <ErrorMsg error={error} />;
  if (loading && page === 1) return <Loading />;

  return (
    <ul className="StyledFeedPhotos animeLeft">
      {data && data.map((photo) => (
        <FeedPhotosItem
          photo={photo}
          key={photo.id}
          setModalPhoto={setModalPhoto}
        />
      ))}
      {loading && <Loading />}
    </ul>
  );
}

export default FeedPhotos;
