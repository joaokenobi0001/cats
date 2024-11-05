import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      try {
        json = await response.json();
      } catch (jsonError) {
        setError('Resposta da API não é JSON');
        throw new Error('Resposta da API não é JSON');
      }
      setData(json);
    } catch (fetchError) {
      setError(fetchError.message);
      console.error('Erro durante a requisição:', fetchError);
    } finally {
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
