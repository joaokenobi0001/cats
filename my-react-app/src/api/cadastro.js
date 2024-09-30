import axios from 'axios';

const REGISTER_URL = 'http://localhost:3000/api/v1/user';

export async function registerUser(username, email, password) {
  try {
    const response = await axios.post(REGISTER_URL, {
      name: username, // Nome do usuário
      email,          // E-mail
      password,       // Senha
      role: 'admin', // Role padrão, ajuste se necessário
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar:', error.response ? error.response.data : error);
    throw new Error('Erro ao cadastrar. Tente novamente.');
  }
}
