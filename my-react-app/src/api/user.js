import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/user/login';
const REGISTER_URL = 'http://localhost:3000/api/v1/user';

export async function registerUser(username, email, password) {
  try {
    const response = await axios.post(REGISTER_URL, {
      name: username,
      email,
      password,
      role: 'admin', 
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar:', error.response ? error.response.data : error);
    throw new Error('Erro ao cadastrar. Tente novamente.');
  }
}

export async function loginUser(email, password) {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error.response ? error.response.data : error);
    throw new Error('Email ou senha inválido. Tente novamente.');
  }
}

export async function bloquearUser(id, requestingUser) {
  try {
    const response = await axios.post(`http://localhost:3000/api/v1/user/${id}/block`, {
      requestingUser,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao bloquear usuário:', error.response ? error.response.data : error);
    throw new Error('Erro ao bloquear usuário. Tente novamente.');
  }
}

export async function desbloquearUser(id, requestingUser) {
  try {
    const response = await axios.post(`http://localhost:3000/api/v1/user/${id}/unblock`, {
      requestingUser,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao desbloquear usuário:', error.response ? error.response.data : error);
    throw new Error('Erro ao desbloquear usuário. Tente novamente.');
  }
}
