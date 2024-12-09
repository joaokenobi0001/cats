import { useState } from 'react';
import { CRIAR_POSTAGEM } from '../api/api';
import Loading from '../Components/Loading';
import ErrorMsg from '../Components/ErrorMsg';

function CriarPostagem() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSucesso(false);

    const token = window.localStorage.getItem('token');
    if (!token) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    const postData = {
      titulo,
      descricao,
      imagem,
    };

    const { url, options } = CRIAR_POSTAGEM(token, postData);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || 'Erro ao criar a postagem.');
      }

      setSucesso(true);
      setTitulo('');
      setDescricao('');
      setImagem('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="CriarPostagem">
      <h1>Crie sua postagem sobre gatos</h1>
      {loading && <Loading />}
      {error && <ErrorMsg error={error} />}
      {sucesso && <p>Postagem criada com sucesso!</p>}
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        ></textarea>

        <label htmlFor="imagem">Link da Imagem:</label>
        <input
          type="url"
          id="imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Postagem'}
        </button>
      </form>
    </section>
  );
}

export default CriarPostagem;
