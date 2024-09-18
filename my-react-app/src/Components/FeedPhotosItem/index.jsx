import React from 'react';
import Image from '../Image';
import './style.css'; // Importa o CSS

function FeedPhotosItem({ photo, setModalPhoto }) {
  function handleClick() {
    if (photo) {
      setModalPhoto(photo);
    }
  }

  // Verifica se 'photo' e 'photo.url' são definidos
  if (!photo || !photo.url) {
    return null; // Ou exiba uma mensagem de erro, se preferir
  }

  return (
    <li className="StyledFeedPhotosItem" onClick={handleClick}>
      <Image src={photo.url} alt={photo.title || 'Imagem de gato'} />
      <span className="visualizacao">{photo.views || '0'}</span>
    </li>
  );
}

export default FeedPhotosItem;
