import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//import UserContext from '../../Context/UserContext';
import Image from '../Image';
import PhotoComments from '../PhotoComments';
import PhotoDelete from '../PhotoDelete';
import Title from '../Title';
import './style.css'; // Importa o CSS

function PhotoContent({ data, single }) {
  const { photo, comments } = data;
  const user = useContext(UserContext);

  return (
    <div className={`StyledPhotoContent ${single ? 'single' : ''}`}>
      <div className="img">
        <Image src={photo.src} alt={photo.title} />
      </div>

      <div className="details">
        {user.data && user.data.username === photo.author ? (
          <PhotoDelete id={photo.id} />
        ) : (
          <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
        )}
        <p className="author">
          <span className="visualizacoes">{photo.acessos}</span>
        </p>
        <Title type="h1">
          <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
        </Title>
        <ul className="attributes">
          <li>{photo.peso} kg</li>
          <li>
            {photo.idade <= 1 ? `${photo.idade} ano` : `${photo.idade} anos`}
          </li>
        </ul>
      </div>

      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
}

export default PhotoContent;
