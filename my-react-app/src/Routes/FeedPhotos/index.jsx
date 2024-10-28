import React, { useCallback, useEffect, useState } from 'react';
import { GET_CATS } from '../../api/cats';
import ErrorMsg from '../../Components/ErrorMsg';
import FeedPhotosItem from '../../Components/FeedPhotosItem';
import Loading from '../../Components/Loading';
import useFetch from '../../Utils/useFetch';
import './style.css';

function FeedPhotos({ setModalPhoto }) {
  const [page, setPage] = useState(1);
  const { data, loading, error, request } = useFetch();
  const [hasMore, setHasMore] = useState(true);
  const [photos, setPhotos] = useState([]);

  const [apiType] = useState('cats');

  // Busca de fotos de gatos
  useEffect(() => {
    if (apiType === 'cats') {
      async function fetchPhotos() {
        const total = 1; // Define o número de fotos por requisição
        const { url, options } = GET_CATS(page, total);
        const { response, json } = await request(url, options);

        if (response && response.ok) {
          if (json.results.length < total) {
            setHasMore(false);
          }
          setPhotos((prevPhotos) => [...prevPhotos, ...json.results]); // Atualiza o estado com as novas fotos
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
        {photos.map((photo) => (
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
