import React, { useState } from 'react';
import { registerUser } from '../api/user'; // Importe a nova função
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';
import Head from '../Components/Head';
import Input from '../Components/Input';
import Title from '../Components/Title';
import { useUserContext } from '../context/UserContext'; // Certifique-se de usar a função corretamente
import useFetch from '../Utils/useFetch';
import useForm from '../Utils/useForm';

function LoginCreate() {
    const username = useForm();
    const password = useForm('password');
    const email = useForm('email');

    const { setUser } = useUserContext(); // Use useUserContext em vez de useContext
    const [error, setError] = useState(null); // Estado para erros
    const { loading, request } = useFetch();

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null); // Limpa o erro anterior
        try {
            const data = await registerUser(username.value, email.value, password.value);
            setUser({ username: data.name }); // Ajuste conforme necessário
            console.log('Cadastro bem-sucedido:', data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Ocorreu um erro ao cadastrar.'); // Atualize o estado de erro
        }
    }

    return (
        <section className="animeLeft">
            <Head title="Crie sua conta" />
            <Title type="h1">Cadastre-se</Title>

            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username} />
                <Input label="E-mail" type="email" name="email" {...email} />
                <Input label="Senha" type="password" name="password" {...password} />

                <Button content={loading ? "Carregando..." : "Cadastrar"} disabled={loading} />

                <ErrorMsg error={error} />
            </form>
        </section>
    );
}

export default LoginCreate;
