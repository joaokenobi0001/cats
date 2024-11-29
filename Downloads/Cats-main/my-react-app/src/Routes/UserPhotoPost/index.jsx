import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CRIAR_POSTAGEM } from '../../api/cats';
import Button from '../../Components/Button';
import ErrorMsg from '../../Components/ErrorMsg';
import Input from '../../Components/Input';
import useFetch from '../../Utils/useFetch';
import useForm from '../../Utils/useForm';
import './style.css';

function UserPhotoPost() {
  const nome = useForm();
  const descricao = useForm();
  const [img, setImgUrl] = useState('');
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  // Redireciona para a página "conta" quando os dados são retornados
  useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    // Valida se todos os campos estão preenchidos
    if (!nome.value || !descricao.value || !img) {
      console.error('Todos os campos devem ser preenchidos.');
      return;
    }

    const postData = {
      nome: nome.value,
      descricao: descricao.value,
      img,
    };

    const token = window.localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado. Por favor, faça login novamente.');
      return;
    }

    // Faz a requisição usando `useFetch`
    const { url, options } = CRIAR_POSTAGEM(token, postData);
    const response = await request(url, options);

   
  }

  // Atualiza o estado da URL da imagem
  function handleImgUrlChange(event) {
    setImgUrl(event.target.value);
  }

  return (
    <section className="StyledUserPhotoPost animeLeft">
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Descrição" type="text" name="descricao" {...descricao} />
        <Input
          label="URL da Imagem"
          type="text"
          name="imgUrl"
          value={img}
          onChange={handleImgUrlChange}
        />
        {loading ? (
          <Button content="Carregando..." disabled />
        ) : (
          <Button content="Enviar" />
        )}
        <ErrorMsg error={error} />
      </form>
      {/* Exibe a pré-visualização da imagem */}
      {img && (
        <div
          className="preview"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      )}
    </section>
  );
}

export default UserPhotoPost;
