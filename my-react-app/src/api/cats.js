// src/api/api.js
const API_URL = 'https://api.thecatapi.com/v1';
const MY_URL = 'http://localhost:3000/api/v1/gatos/';

export function fetchCatImages(page, limit) {
  const url = `${API_URL}/images/search?limit=${limit}&page=${page}`;
  const options = {
    method: 'GET',
  };

  return { url, options };
}

export function GET_CATS(token) {
  const url = `${MY_URL}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  return { url, options };
}

export function DELETE_POSTAGEM(token, id) {
  const url = `${MY_URL}/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return { url, options };
}

export function EDITAR_POSTAGEM(token, id) {
  const url = `${MY_URL}/${id}`; 
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json', 
    },
  };
  return { url, options };
}
