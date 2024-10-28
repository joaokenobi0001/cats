// src/api/api.js
const API_URL = 'https://api.thecatapi.com/v1';
const MY_URL = 'http://localhost:3000/api/v1/gatos/';
// Função para buscar imagens de gatos com paginação
export function fetchCatImages(page, limit) {
  const url = `${API_URL}/images/search?limit=${limit}&page=${page}`;
  const options = {
    method: 'GET',
  };

  return { url, options };
}

export function GET_POSTAGENS(page, limit) {
  const url = `${API_URL}/images/search?limit=${limit}&page=${page}`;
  const options = {
    method: 'GET',
  };

  return { url, options };
}

export function GET_CATS(page, limit) {
  const url = `${MY_URL}`;
  const options = {
    method: 'GET',
  };

  return { url, options };
}