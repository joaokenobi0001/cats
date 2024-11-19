import React, { useState } from 'react';
import { DELETE_POSTAGEM, EDITAR_POSTAGEM } from '../../api/cats';
import Image from '../Image';
import './style.css';

function FeedPhotosItem({ photo, onDelete, onUpdate, setModalPhoto }) {
  const token = window.localStorage.getItem('token');
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState({ ...photo });

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
    options.body = JSON.stringify(editedPhoto); // Adicione os dados do gato aqui

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            alert('Imagem editada com sucesso!');
            setIsEditing(false);
            onUpdate(editedPhoto); // Chama a função de atualização após editar
        } else {
            const errorData = await response.json(); // Obtém os detalhes do erro
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

  return (
    <li className="StyledFeedPhotosItem">
      <Image src={photo.url} alt={photo.nome || 'Imagem de gato'} className="StyledImage" />
      <div className="photo-info">
        {isEditing ? (
          <div className="edit-container">
            <input type="text" name="nome" value={editedPhoto.nome} onChange={handleChange} placeholder="Nome" className="edit-input" />
            <input type="text" name="descricao" value={editedPhoto.descricao} onChange={handleChange} placeholder="Descrição" className="edit-input" />
            <input type="text" name="origem" value={editedPhoto.origem} onChange={handleChange} placeholder="Origem" className="edit-input" />
            <input type="text" name="temperamento" value={editedPhoto.temperamento} onChange={handleChange} placeholder="Temperamento" className="edit-input" />
            <input type="text" name="nivel_energia" value={editedPhoto.nivel_energia} onChange={handleChange} placeholder="Nível de Energia" className="edit-input" />
            <input type="text" name="vida_media" value={editedPhoto.vida_media} onChange={handleChange} placeholder="Vida Média" className="edit-input" />
            <input type="text" name="adaptabilidade" value={editedPhoto.adaptabilidade} onChange={handleChange} placeholder="Adaptabilidade" className="edit-input" />
            <input type="text" name="inteligencia" value={editedPhoto.inteligencia} onChange={handleChange} placeholder="Inteligência" className="edit-input" />
            <button className="save-button" onClick={handleSave}>Salvar</button>
          </div>
        ) : (
          <>
            <h3 className="photo-name">{photo.nome || 'Nome desconhecido'}</h3>
            <p className="photo-description"><strong>Descrição:</strong> {photo.descricao || 'Sem descrição'}</p>
            <p><strong>Origem:</strong> {photo.origem || 'Desconhecida'}</p>
            <p><strong>Temperamento:</strong> {photo.temperamento || 'Desconhecido'}</p>
            <p><strong>Nível de Energia:</strong> {photo.nivel_energia || 'Desconhecido'}</p>
            <p><strong>Vida Média:</strong> {photo.vida_media || 'Desconhecida'}</p>
            <p><strong>Adaptabilidade:</strong> {photo.adaptabilidade || 'Desconhecida'}</p>
            <p><strong>Inteligência:</strong> {photo.inteligencia || 'Desconhecida'}</p>
          </>
        )}
        <div className='botoes'>
          <button className="deletar" onClick={handleClickDeletar}>Deletar</button>
          <button className="editar" onClick={handleClickEditar}>{isEditing ? 'Cancelar' : 'Editar'}</button>
        </div>
      </div>
    </li>
  );
}

export default FeedPhotosItem;
