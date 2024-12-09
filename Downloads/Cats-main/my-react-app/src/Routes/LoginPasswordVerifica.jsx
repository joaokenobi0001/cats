import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { verifyRecoveryCode } from '../api/user'; // Certifique-se de que a função está exportada corretamente
import Button from '../Components/Button'; 
import ErrorMsg from '../Components/ErrorMsg'; 
import Head from '../Components/Head'; 
import Input from '../Components/Input'; 
import Title from '../Components/Title'; 
import useFetch from '../Utils/useFetch'; 
import useForm from '../Utils/useForm';

function LoginPasswordVerifica() { 
  const code = useForm(); 
  const { loading, error, request } = useFetch(); 
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');

  // Obter o email da URL
  useEffect(() => { 
    const params = new URLSearchParams(window.location.search); 
    setEmail(params.get('email') || ''); 
  }, []);

  const handleCodeSubmit = async (event) => { 
    event.preventDefault();

    // Verificar se os campos estão preenchidos
    if (!code.value) {
      setMessage('O código é obrigatório.');
      return;
    }

    const { url, options } = verifyRecoveryCode({
      email,
      codigoAcesso: code.value, // Certifique-se de usar "codigoAcesso" para corresponder ao backend
    });

    try {
      const { response, json } = await request(url, options);

      if (response.ok) {
        // Redirecionar para a página de redefinição de senha
        navigate(`/login/resetar?login=${encodeURIComponent(email)}&key=${code.value}`);
      } else {
        // Exibir mensagem de erro do servidor
        setMessage(json.error || 'Erro ao verificar o código.');
      }
    } catch (e) {
      setMessage('Erro desconhecido. Tente novamente.');
      console.error('Erro durante a verificação:', e);
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Verificar Código" />
      <Title type="h1">Verifique seu código</Title>
      <form onSubmit={handleCodeSubmit}>
        <Input label="Código de recuperação" type="text" name="code" {...code} />
        <Button content={loading ? 'Verificando...' : 'Verificar código'} disabled={loading} />
      </form>
      {message && <p style={{ color: message.includes('Erro') ? 'red' : 'green' }}>{message}</p>}
      <ErrorMsg error={error} />
    </section>
  );
}

export default LoginPasswordVerifica;
