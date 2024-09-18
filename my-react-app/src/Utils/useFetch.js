import { useCallback, useState } from 'react';

function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType.includes('application/json')) {
        throw new Error('Resposta inválida da API');
      }
      const json = await response.json();
      setData(json);
      return { response, json };
    } catch (err) {
      setError(err.message || 'Erro desconhecido');
      return { response: null, json: null };
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, request };
}

export default useFetch;
