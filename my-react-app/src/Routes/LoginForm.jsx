import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';
import Head from '../Components/Head';
import Input from '../Components/Input';
import Title from '../Components/Title';
import useForm from '../Utils/useForm';
import { loginUser } from '../api/login'; // Atualize a importação

function LoginForm() {
  const username = useForm();
  const password = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      setLoading(true);
      setError(null); // Resetar erro antes da nova tentativa

      try {
        const data = await loginUser(username.value, password.value);
        
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Login bem-sucedido');
          navigate('/'); // Redirecionar após login
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
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
            <Link to="/login/criar">
                <Button content="Cadastro" /> {/* Passe apenas o texto */}
            </Link>
        </div>    
      </section>
    </>
  );
}

export default LoginForm;
