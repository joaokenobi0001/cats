import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';
import Head from '../Components/Head';
import Input from '../Components/Input';
import Title from '../Components/Title';
import useForm from '../Utils/useForm';

function LoginForm() {
  const username = useForm();
  const password = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (username.validate() && password.validate()) {
      setLoading(true);
      try {
        // Simular uma chamada de API para login
        // Substitua o código abaixo pela chamada real para autenticação
        const response = await fakeLogin(username.value, password.value);
        
        if (response.success) {
          // Redirecionar ou atualizar estado de autenticação
          console.log('Login bem-sucedido');
        } else {
          setError('Dados incorretos.');
        }
      } catch (err) {
        setError('Erro inesperado. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  }

  // Função simulada para login (substitua com a lógica real)
  async function fakeLogin(username, password) {
    // Simulação de sucesso ou falha de login
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({ success: username === 'admin' && password === 'password' });
      }, 1000)
    );
  }

  return (
    <>
      <Head title="Login" />
      <section className='animeLeft'>
        <Title type='h1'>Login</Title>

        <form className="form" onSubmit={handleSubmit}>
          <Input name="user" label="Usuário" type="text" {...username} />
          <Input name="password" label="Senha" type="password" {...password} />

          {loading ? <Button content="Carregando" disabled /> : <Button content="Entrar" />}

          <ErrorMsg error={error} />
        </form>

        <Link to='/login/perdeu' className='lost'>Esqueceu a senha?</Link>

        <div className='cadastro'>
          <Title type='h2'>Cadastre-se</Title>
          <p>Ainda não possui conta? Cadastre-se no site.</p>
          <a href="/login/criar">
            <Button content={<Link>Cadastro</Link>} />
          </a>
        </div>        
      </section>
    </>
  );
}

export default LoginForm;
