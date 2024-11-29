import React, { useContext } from 'react';
import { registerUser } from '../api/user';
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';
import Head from '../Components/Head';
import Input from '../Components/Input';
import Title from '../Components/Title';
import UserContext from '../context/UserContext';
import useFetch from '../Utils/useFetch';
import useForm from '../Utils/useForm';

// Componente LoginCreate que é usado para o fluxo de cadastro de usuários
function LoginCreate() {
  const username = useForm();
  const password = useForm('password');
  const email = useForm('email');

  const { userLogin } = useContext(UserContext);

  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = registerUser({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) {
      userLogin(username.value, password.value); // Loga automaticamente após cadastro
    }
    console.log(response);
  }

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <Title type="h1">Cadastre-se</Title>

      <form onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="E-mail" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />

        {loading ? (
          <Button content="Carregando..." disabled />
        ) : (
          <Button content="Cadastrar" />
        )}

        <ErrorMsg error={error} />
      </form>
    </section>
  );
}

function Cadastro() {
  return (
    <div className="container">
      <header className="header">
        <h1>Bem-vindo ao Cadastro</h1>
      </header>
      <main>
        {/* Chama o componente LoginCreate para exibir o formulário de cadastro */}
        <LoginCreate />
      </main>
      <footer className="footer">
        <p>© 2024 Cats.</p>
      </footer>
    </div>
  );
}

export default Cadastro;

