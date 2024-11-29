// src/api/api.js
const API_URL = 'https://api.thecatapi.com/v1';

// Função para buscar imagens de gatos com paginação
export function fetchCatImages(page, limit) {
  const url = `${API_URL}/images/search?limit=${limit}&page=${page}`;
  const options = {
    method: 'GET',
  };

  return { url, options };
}
