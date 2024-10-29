import React from 'react';
import Image from '../Image';
import './style.css'; // Importa o CSS

function FeedPhotosItemHome({ photo, setModalPhoto }) {
  function handleClick() {
    if (photo) {
      setModalPhoto(photo);
    }
  }


  if (!photo || !photo.url) {
    return null; 
  }

  return (
    <li className="StyledFeedPhotosItem" onClick={handleClick}>
      <Image src={photo.url} alt={photo.title || 'Imagem de gato'} />
      <span className="visualizacao">{photo.views || '0'} visualizações</span>
    </li>
    
  );
}

export default FeedPhotosItemHome;
