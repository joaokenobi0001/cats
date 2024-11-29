import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enviar_code } from '../api/user';
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';
import Head from '../Components/Head';
import Input from '../Components/Input';
import Title from '../Components/Title';
import useFetch from '../Utils/useFetch';
import useForm from '../Utils/useForm';

function LoginPasswordLost() {
  const login = useForm(); // Hook para e-mail
  const { loading, error, request } = useFetch();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!login.value) {
      setMessage('Email é obrigatório.');
      return;
    }

    const { url, options } = enviar_code({
      email: login.value,
      url: `${window.location.origin}/login/verifica`,
    });

    try {
      // `request` já retorna { response, json }, não é necessário chamar `.json()` novamente
      const { response, json } = await request(url, options);

      // Log para depuração
      console.log('API Response:', { response, json });

      if (response.ok && json.success) {
        setMessage('Código enviado para o seu e-mail.');
        navigate(`/login/verifica?email=${encodeURIComponent(login.value)}`);
      } else {
        setMessage(json.message || 'Erro ao enviar o código. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro ao enviar o código:', err); // Log para erros
      setMessage('Erro ao enviar o código.');
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha" />
      <Title type="h1">Perdeu a senha?</Title>
      <form onSubmit={handleSubmit}>
        <Input label="E-mail" type="text" name="login" {...login} />
        <Button content={loading ? 'Enviando...' : 'Enviar e-mail'} disabled={loading} />
      </form>
      {message && <p style={{ color: message.includes('erro') ? 'red' : 'green' }}>{message}</p>}
      <ErrorMsg error={error} />
    </section>
  );
}

export default LoginPasswordLost;
