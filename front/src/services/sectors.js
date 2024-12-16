import { useMutation, useQuery } from '@tanstack/react-query';

const getSectorsCreateClient = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + '/api/sectors');
  if (!response.ok) {
    throw new Error('Error en la petición');
  }

  return await response.json();
};