const API_URL = 'http://localhost:3000/api/v1/character/';

export const fetchCharacters = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    const data = await response.json();
    return data.results; // Retorna a lista de personagens
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
};