// src/api/login.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/user/login';

export async function loginUser(email, password) {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Email ou senha inválido. Tente novamente.');
  }
}
