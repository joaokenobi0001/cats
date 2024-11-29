import React, { useState } from 'react';
//import { COMMENT_POST } from '../../api/api';
//import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Utils/useFetch';
import ErrorMsg from '../ErrorMsg';
import './style.css'; // Importa o CSS

function PhotoCommentsForm({ id, setComments }) {
  const [comment, setComment] = useState('');
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form className="StyledPhotoCommentsForm" onSubmit={handleSubmit}>
      <textarea
        className="textarea"
        name="comment"
        id="comment"
        placeholder="Comente aqui"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className="button">
     
      </button>
      <ErrorMsg error={error} />
    </form>
  );
}

export default PhotoCommentsForm;
