import React from 'react';
//import { PHOTO_DELETE } from '../../Api/api';
import useFetch from '../../Utils/useFetch';
import './style.css'; // Importa o CSS

function PhotoDelete({ id }) {
  const { loading, request } = useFetch();

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }

  return (
    <div className="StyledPhotoDelete">
      {loading ? (
        <button className="delete" disabled>
          Deletar
        </button>
      ) : (
        <button className="delete" onClick={handleClick}>
          Deletar
        </button>
      )}
    </div>
  );
}

export default PhotoDelete;
