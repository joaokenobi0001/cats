import React, { useCallback, useEffect, useState } from 'react';
import { fetchCatImages } from '../../api/cats'; // Função da API de gatos
import ErrorMsg from '../../Components/ErrorMsg';
import FeedPhotosItem from '../../Components/FeedPhotosItem';
import Loading from '../../Components/Loading';
import useFetch from '../../Utils/useFetch'; // Hook useFetch
import './style.css';

function FeedPhotos({ setModalPhoto }) {
  const [page, setPage] = useState(1);
  const { data, loading, error, request } = useFetch();
  const [hasMore, setHasMore] = useState(true);
  const [apiType] = useState('cats'); // Estado para controlar a API
 

 

  // Busca de fotos de gatos
  useEffect(() => {
    if (apiType === 'cats') {
      async function fetchPhotos() {
        const total = 3;
        const { url, options } = fetchCatImages(page, total);
        const { response, json } = await request(url, options);

        if (response && response.ok) {
          if (json.length < total) setHasMore(false);
        } else {
          setHasMore(false);
        }
      }
      fetchPhotos();
    }
  }, [page, request, apiType]);

 

  // Scroll infinito para gatos
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

  if (error) return <ErrorMsg error={error} />;
  if (loading && page === 1) return <Loading />;

  return (
    <div className="feed-photos-container">
    
        <ul className="feed-photos-list">
          {data && data.map((photo) => (
            <FeedPhotosItem
              photo={photo}
              key={photo.id}
              setModalPhoto={setModalPhoto}
            />
          ))}
          {loading && <Loading />}
        </ul>
      
    </div>
  );
}

export default FeedPhotos;
