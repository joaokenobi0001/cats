import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recuperar_senha, verificar_senha } from '../api/user';
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';
import Head from '../Components/Head';
import Input from '../Components/Input';
import Title from '../Components/Title';
import useFetch from '../Utils/useFetch';
import useForm from '../Utils/useForm';

function LoginPasswordLost() {
  const login = useForm(); // Hook para e-mail
  const code = useForm();  // Hook para código de recuperação
  const { loading, error, request } = useFetch();
  const [message, setMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false); // Estado de envio do código
  const navigate = useNavigate(); // Navegação

  // Função para enviar e-mail com código de recuperação
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!login.value) {
      setMessage('Email é obrigatório.');
      return;
    }

    const { url, options } = recuperar_senha({
      email: login.value,
      url: window.location.href.replace('perdeu', 'resetar'),
    });

    try {
      const json = await request(url, options);
      if (json.success) {
        setIsCodeSent(true); // Código enviado com sucesso
        setMessage('Código enviado para o seu e-mail.');
      } else {
        setMessage('Erro ao enviar o código. Tente novamente.');
      }
    } catch {
      setMessage('Erro ao enviar o código.');
    }
  };

  // Função para validar o código enviado pelo usuário
  const handleCodeSubmit = async (event) => {
    event.preventDefault();

    if (!code.value) {
      setMessage('O código é obrigatório.');
      return;
    }

    const { url, options } = verificar_senha({
      email: login.value,
      code: code.value,
    });

    try {
      const json = await request(url, options);
      if (json.success) {
        navigate(`/resetar?login=${login.value}&key=${code.value}`);
      } else {
        setMessage('Código inválido. Tente novamente.');
      }
    } catch {
      setMessage('Erro ao verificar o código.');
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha" />
      <Title type="h1">Perdeu a senha?</Title>

      {isCodeSent ? (
        <form onSubmit={handleCodeSubmit}>
          <Input label="Código de recuperação" type="text" name="code" {...code} />
          <Button content={loading ? 'Verificando...' : 'Verificar código'} disabled={loading} />
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="E-mail" type="text" name="login" {...login} />
          <Button content={loading ? 'Enviando...' : 'Enviar e-mail'} disabled={loading} />
        </form>
      )}

      {message && <p style={{ color: message.includes('erro') ? 'red' : 'green' }}>{message}</p>}
      <ErrorMsg error={error} />
    </section>
  );
}

export default LoginPasswordLost;
