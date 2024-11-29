import React, { useState, useContext } from 'react';
import { DELETE_POSTAGEM, EDITAR_POSTAGEM } from '../../api/cats';
import UserContext from '../../context/UserContext';
import Image from '../Image';
import './style.css';

function FeedPhotosItem({ photo, onDelete, onUpdate }) {
  const token = window.localStorage.getItem('token');
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState({ ...photo });
  const { data } = useContext(UserContext); // Contexto do usuário

  async function handleClickDeletar() {
    if (window.confirm('Tem certeza que deseja deletar esta imagem?')) {
      const { url, options } = DELETE_POSTAGEM(token, photo.id);

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          alert('Imagem deletada com sucesso!');
          onDelete(photo.id);
        } else {
          alert('Erro ao deletar a imagem. Verifique se a imagem existe.');
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao tentar deletar a imagem. Tente novamente mais tarde.');
      }
    }
  }

  function handleClickEditar() {
    setIsEditing(!isEditing);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedPhoto((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSave() {
    const { url, options } = EDITAR_POSTAGEM(token, photo.id);
    options.body = JSON.stringify(editedPhoto);

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        alert('Imagem editada com sucesso!');
        setIsEditing(false);
        onUpdate(editedPhoto);
      } else {
        const errorData = await response.json();
        alert(`Erro ao editar a imagem: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao tentar editar a imagem. Tente novamente mais tarde.');
    }
  }

  if (!photo || !photo.url) {
    return null;
  }

  const hasData = photo.nome || photo.descricao || photo.origem || photo.temperamento || 
                  photo.nivel_energia || photo.vida_media || photo.adaptabilidade || photo.inteligencia;

  const isAdmin = data?.user?.role === 'admin'; // Verifica se é admin

  return (
    <li className="StyledFeedPhotosItem">
      <Image src={photo.url} alt={photo.nome || 'Imagem de gato'} className="StyledImage" />
      <div className="photo-info">
        {isEditing ? (
          <div className="edit-container">
            {Object.keys(editedPhoto).map((key) => (
              key !== 'id' && key !== 'url' && (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={editedPhoto[key]}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                  className="edit-input"
                />
              )
            ))}
            <button className="save-button" onClick={handleSave}>Salvar</button>
          </div>
        ) : (
          <>
            {hasData && (
              <>
                {photo.nome && <h3 className="photo-name">{photo.nome}</h3>}
                {photo.descricao && <p><strong>Descrição:</strong> {photo.descricao}</p>}
                {photo.origem && <p><strong>Origem:</strong> {photo.origem}</p>}
                {photo.temperamento && <p><strong>Temperamento:</strong> {photo.temperamento}</p>}
                {photo.nivel_energia && <p><strong>Nível de Energia:</strong> {photo.nivel_energia}</p>}
                {photo.vida_media && <p><strong>Vida Média:</strong> {photo.vida_media}</p>}
                {photo.adaptabilidade && <p><strong>Adaptabilidade:</strong> {photo.adaptabilidade}</p>}
                {photo.inteligencia && <p><strong>Inteligência:</strong> {photo.inteligencia}</p>}
              </>
            )}
          </>
        )}

        {isAdmin && (
          <div className="botoes">
            <button className="deletar" onClick={handleClickDeletar}>Deletar</button>
            <button className="editar" onClick={handleClickEditar}>{isEditing ? 'Cancelar' : 'Editar'}</button>
          </div>
        )}
      </div>
    </li>
  );
}

export default FeedPhotosItem;
