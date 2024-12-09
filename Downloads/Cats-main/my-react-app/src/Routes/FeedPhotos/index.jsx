import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Adiciona a importação de PropTypes
import { GET_CATS } from '../../api/cats';
import ErrorMsg from '../../Components/ErrorMsg';
import FeedPhotosItem from '../../Components/FeedPhotosItem';
import Loading from '../../Components/Loading';
import useFetch from '../../Utils/useFetch';
import './style.css';

function FeedPhotos({ setModalPhoto }) {
  const [page, setPage] = useState(1);
  const { loading, error, request } = useFetch();
  const [hasMore, setHasMore] = useState(true);
  const [photos, setPhotos] = useState([]);

  const apiType = 'cats';

  useEffect(() => {
    async function fetchPhotos() {
      const total = 1;
      const { url, options } = GET_CATS(page, total);
      const { response, json } = await request(url, options);

      if (response && response.ok) {
        if (json.results.length < total) {
          setHasMore(false);
        }
        setPhotos((prevPhotos) => [...prevPhotos, ...json.results]);
      } else {
        setHasMore(false);
      }
    }

    if (apiType === 'cats') {
      fetchPhotos();
    }
  }, [page, request, apiType]);

  // Scroll infinito
  const handleScroll = useCallback(() => {
    if (
      apiType === 'cats' &&
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 200 &&
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

  // Função para deletar uma foto
  const handleDeletePhoto = (id) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
  };

  // Função para atualizar uma foto
  const handleUpdatePhoto = (updatedPhoto) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) => 
        photo.id === updatedPhoto.id ? updatedPhoto : photo
      )
    );
  };

  if (error) return <ErrorMsg error={error} />;
  if (loading && page === 1) return <Loading />;

  return (
    <div className="feed-photos-container">
      <div className="feed-photos-list">
        {photos.map((photo) => (
          <FeedPhotosItem
            photo={photo}
            key={photo.id}
            onDelete={handleDeletePhoto}
            onUpdate={handleUpdatePhoto} // Adiciona esta linha
            setModalPhoto={setModalPhoto}
          />
        ))}
        {loading && <Loading />}
      </div>
    </div>
  );
}

// Validação de props usando PropTypes
FeedPhotos.propTypes = {
  setModalPhoto: PropTypes.func.isRequired, // Define que 'setModalPhoto' é uma função e é obrigatória
};

export default FeedPhotos;
