import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para redirecionamento
import Button from '../../Components/Button'; 
import ErrorMsg from '../../Components/ErrorMsg'; 
import Head from '../../Components/Head'; 
import Input from '../../Components/Input'; 
import Title from '../../Components/Title'; 
import { UserContext } from '../../context/UserContext'; 
import useFetch from '../../Utils/useFetch'; 
import useForm from '../../Utils/useForm'; 
import { registerUser } from '../../api/user'; 

const Cadastro = () => {
  // Hooks personalizados para controlar o valor dos campos
  const name = useForm(); 
  const email = useForm('email');
  const password = useForm('password');
  
  const { userLogin, error, loading } = useContext(UserContext); // Contexto para gerenciar login
  const { request } = useFetch(); // Hook para requisições
  const navigate = useNavigate(); // Hook para redirecionamento

  // Função chamada ao submeter o formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Valida campos antes de submeter
    if (!name.validate() || !email.validate() || !password.validate()) {
      console.error('Preencha todos os campos corretamente.');
      return;
    }

    // Certifique-se de que o corpo da requisição está correto
    const { url, options } = registerUser({
      name: name.value,  
      email: email.value,
      password: password.value,
    });

    try {
      const { response } = await request(url, options);
      if (response.ok) {
        // Faz login automaticamente após cadastro
        await userLogin(name.value, email.value, password.value);  

        // Redireciona para a página de perfil após o login
        navigate('/user');  // Redireciona para a página de perfil, onde exibe os dados do usuário
      } else {
        // Lida com o erro de resposta do servidor
        const errorMessage = await response.json();
        console.error('Erro ao cadastrar:', errorMessage.message || response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <Title type="h1">Cadastre-se</Title>

      <form onSubmit={handleSubmit}>
        {/* Campos do formulário */}
        <Input label="Nome" type="text" name="name" {...name} />  
        <Input label="E-mail" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} /> 

        {/* Botão de submit */}
        {loading ? (
          <Button content="Carregando..." disabled />
        ) : (
          <Button content="Cadastrar" />
        )}

        {/* Exibição de erro, se houver */}
        <ErrorMsg error={error} />
      </form>
    </section>
  );
};

export default Cadastro;
