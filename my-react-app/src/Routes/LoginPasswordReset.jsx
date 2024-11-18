import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';
import Head from '../Components/Head';
import Input from '../Components/Input';
import Title from '../Components/Title';
import useFetch from '../Utils/useFetch';
import useForm from '../Utils/useForm';
import { atualizar_senha } from '../api/user';

function LoginPasswordReset() {
  const [login, setLogin] = useState('');
  const [key, setKey] = useState('');
  const password = useForm('password');
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setKey(params.get('key') || '');
    setLogin(params.get('login') || '');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.validate()) {
      const { url, options } = atualizar_senha({
        login,
        key,
        password: password.value,
      });

      try {
        const { response } = await request(url, options);
        if (response.ok) navigate('/login'); // Redireciona para login
      } catch {
        console.error('Erro ao redefinir a senha.');
      }
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Resete sua senha" />
      <Title type="h1">Resete a senha</Title>
      <form onSubmit={handleSubmit}>
        <Input label="Nova senha" type="password" name="password" {...password} />
        <Button content={loading ? 'Resetando...' : 'Resetar'} disabled={loading} />
      </form>
      <ErrorMsg error={error} />
    </section>
  );
}

export default LoginPasswordReset;
