import React, { useEffect, useState } from 'react';
import { fetchCatImageById } from '../../api/api'; // Importa a função para buscar imagem por ID
import ErrorMsg from '../ErrorMsg';
import Loading from '../Loading';
import PhotoContent from '../PhotoContent';
import './style.css';

function FeedModal({ photo, setModalPhoto }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPhoto() {
      setLoading(true);
      try {
        const photoData = await fetchCatImageById(photo.id);
        setData(photoData);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar a imagem.');
      } finally {
        setLoading(false);
      }
    }

    if (photo) {
      loadPhoto();
    }
  }, [photo]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setModalPhoto(null);
  }

  return (
    <div className="StyledFeedModal" onClick={handleOutsideClick}>
      {error && <ErrorMsg error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
}

export default FeedModal;
