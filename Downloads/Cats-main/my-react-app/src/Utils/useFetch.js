import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options) => {
    let response = null;
    let json = null;

    try {
      setError(null);
      setLoading(true);

      // Fazendo a requisição
      response = await fetch(url, options);

      // Tentando processar o corpo como JSON, se existir
      if (response.status !== 204) { // Ignora o corpo para respostas 204 No Content
        try {
          json = await response.json();
        } catch {
          throw new Error('A resposta da API não pôde ser convertida para JSON.');
        }
      }

      // Verifica o status HTTP
      if (!response.ok) {
        throw new Error(json?.message || 'Erro desconhecido na API.');
      }

      setData(json); // Armazena os dados no estado, se necessário
    } catch (fetchError) {
      console.error('Erro durante a requisição:', fetchError);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }

    // Retorna a resposta e o JSON processado (ou `null` para respostas sem corpo)
    return { response, json };
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
