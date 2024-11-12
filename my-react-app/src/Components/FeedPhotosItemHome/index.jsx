import React from 'react';
import Image from '../Image';
import './style.css'; // Importa o CSS

function FeedPhotosItemHome({ photo }) {
  return (

      <Image src={photo.url} alt={photo.title || 'Imagem de gato'} />
 
  );
}

export default FeedPhotosItemHome;
