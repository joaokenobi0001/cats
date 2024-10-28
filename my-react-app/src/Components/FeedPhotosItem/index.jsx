import React from 'react';
import Image from '../Image';
import './style.css';

function FeedPhotosItem({ photo, setModalPhoto }) {
  function handleClick() {
    if (photo) {
      setModalPhoto(photo);
    }
  }

  // Verifica se 'photo' e 'photo.url' são definidos
  if (!photo || !photo.url) {
    return null;
  }

  return (
    <li className="StyledFeedPhotosItem" onClick={handleClick}>
      <Image src={photo.url} alt={photo.nome || 'Imagem de gato'} className="StyledImage" />
      <div className="photo-info">
        <h3 className="photo-name">{photo.nome || 'Nome desconhecido'}</h3>
        <p className="photo-description">
          <strong>Descrição:</strong> {photo.descricao || 'Sem descrição'}
        </p>
        <p><strong>Origem:</strong> {photo.origem || 'Desconhecida'}</p>
        <p><strong>Temperamento:</strong> {photo.temperamento || 'Desconhecido'}</p>
        <p><strong>Nível de Energia:</strong> {photo.nivel_energia || 'Desconhecido'}</p>
        <p><strong>Vida Média:</strong> {photo.vida_media || 'Desconhecida'}</p>
        <p><strong>Adaptabilidade:</strong> {photo.adaptabilidade || 'Desconhecida'}</p>
        <p><strong>Inteligência:</strong> {photo.inteligencia || 'Desconhecida'}</p>
        <span className="visualizacao">{photo.views || '0'} visualizações</span>
      </div>
    </li>
  );
}

export default FeedPhotosItem;
