import React, { useCallback, useEffect, useState } from 'react';
import { fetchCatImages } from '../../api/api'; // Função da API de gatos
import { fetchCharacters } from '../../api/RickAndMorty'; // Função da API de Rick and Morty
import ErrorMsg from '../../Components/ErrorMsg';
import FeedPhotosItem from '../../Components/FeedPhotosItem';
import Loading from '../../Components/Loading';
import useFetch from '../../Utils/useFetch'; // Hook useFetch
import './style.css';

function FeedPhotos({ setModalPhoto }) {
  const [page, setPage] = useState(1);
  const { data, loading, error, request } = useFetch();
  const [hasMore, setHasMore] = useState(true);
  const [apiType, setApiType] = useState('cats'); // Estado para controlar a API
  const [characters, setCharacters] = useState([]); // Estado para personagens

  // Alternar entre APIs
  const handleApiChange = (type) => {
    setApiType(type);
    setPage(1); // Reiniciar a paginação
    setHasMore(true); // Resetar o estado de rolagem
    setCharacters([]); // Limpar personagens ao mudar de API
  };

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

  // Busca de personagens
  useEffect(() => {
    if (apiType === 'characters') {
      const getCharacters = async () => {
        try {
          const data = await fetchCharacters();
          setCharacters(data); // Aqui capturamos diretamente o `results`
          setHasMore(false); // Desativamos o scroll infinito para personagens
        } catch (error) {
          console.error('Erro ao buscar personagens:', error);
        }
      };
      getCharacters();
    }
  }, [apiType]);

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
      {/* Botões para alternar entre APIs */}
      <div className="api-selector">
        <button onClick={() => handleApiChange('cats')} className={apiType === 'cats' ? 'active' : ''}>
          Gatos
        </button>
        <button onClick={() => handleApiChange('characters')} className={apiType === 'characters' ? 'active' : ''}>
          Rick and Morty
        </button>
      </div>

      {/* Renderiza personagens ou fotos de gatos */}
      {apiType === 'characters' ? (
        <div className="characters-grid">
          {characters.map((character) => (
            <div key={character.id} className="character-card">
              <img src={character.image} alt={character.name} className="character-img" />
              <h2>{character.name}</h2>
              <p>Espécie: {character.species}</p>
              <p>Gênero: {character.gender}</p>
              <p>Status: {character.status}</p>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default FeedPhotos;
