import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';
import Head from '../Components/Head';
import Input from '../Components/Input';
import Title from '../Components/Title';
import useForm from '../Utils/useForm';
import UserContext from '../context/UserContext';

function LoginForm() {
  const email = useForm(); 
  const password = useForm(); 
  const { userLogin, error, loading } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value); 
    }
  }

  return (
    <>
      <Head title="Login" />
      <section className='animeLeft'>
        <Title type='h1'>Login</Title>
        <form className="form" onSubmit={handleSubmit}>
          <Input name="email" label="E-mail" type="text" {...email} /> 
          <Input name="password" label="Senha" type="password" {...password} />
          {loading ? <Button content="Carregando" disabled /> : <Button content="Entrar" />}
          <ErrorMsg error={error && 'Dados incorretos.'} />
        </form>
        <Link to='/login/perdeu' className='lost'>Esqueceu a senha?</Link>
      </section>
    </>
  );
}

export default LoginForm;
