import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';
import Head from '../Components/Head';
import Input from '../Components/Input';
import Title from '../Components/Title';
import useForm from '../Utils/useForm';
import { UserContext } from '../context/UserContext'; // Correção da importação

function LoginForm() {
  const email = useForm(); 
  const password = useForm(); 
  const { userLogin, error, loading } = useContext(UserContext); // Hook para acessar o contexto de login
  const navigate = useNavigate(); // Hook para navegação

  async function handleSubmit(event) {
    event.preventDefault();

    // Validação dos campos de email e senha
    if (email.validate() && password.validate()) {
      try {
        await userLogin(email.value, password.value); // Realiza o login e aguarda o retorno

        // A navegação será realizada dentro do userLogin, se o login for bem-sucedido
        navigate('/user'); // Redireciona para a página de usuário após login
      } catch (err) {
        console.error('Erro na requisição:', err); // Log do erro caso ocorra
      }
    } else {
      console.log('Preencha os campos corretamente');
    }
  }

  return (
    <>
      <Head title="Login" />
      <section className='animeLeft'>
        <Title type='h1'>Login</Title>
        <form className="form" onSubmit={handleSubmit}>
          {/* Campos de formulário */}
          <Input name="email" label="E-mail" type="email" {...email} /> {/* Alterei o type para 'email' */}
          <Input name="password" label="Senha" type="password" {...password} />
          
          {/* Botão de login */}
          {loading ? <Button content="Carregando..." disabled /> : <Button content="Entrar" />}

          {/* Exibição de erro, caso haja */}
          {error && <ErrorMsg error={error} />} {/* Exibindo o erro real retornado */}
        </form>

        {/* Link para recuperação de senha */}
        <Link to='/login/perdeu' className='lost'>Esqueceu a senha?</Link>
      </section>
    </>
  );
}

export default LoginForm;
