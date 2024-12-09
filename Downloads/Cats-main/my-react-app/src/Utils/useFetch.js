import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Definindo o estado error

  const request = useCallback(async (url, options) => {
    let response = null;
    let json = null;

    try {
      setError(null); // Limpando o erro antes de uma nova requisição
      setLoading(true); // Iniciando o carregamento

      response = await fetch(url, options);

      const contentType = response.headers.get('Content-Type');
      if (response.status !== 204) {
        if (contentType && contentType.includes('application/json')) {
          json = await response.json();
        } else {
          json = await response.text();
        }
      }

      if (!response.ok) {
        throw new Error(json?.message || 'Erro desconhecido na API.');
      }

      setData(json); // Armazenando os dados no estado
    } catch (fetchError) {
      console.error('Erro durante a requisição:', fetchError);
      setError(fetchError.message || 'Erro desconhecido na requisição.'); // Definindo o erro
    } finally {
      setLoading(false); // Finalizando o carregamento
    }

    return { response, json };
  }, []);

  return { data, loading, error, request }; // Retornando o estado do erro também
};

export default useFetch;

