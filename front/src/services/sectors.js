import { useQuery } from '@tanstack/react-query';

const getSectorsNewClient = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + '/api/sectors/new-client');
  if (!response.ok) {
    throw new Error('Error en la petición');
  }

  return await response.json();
};

export const useSectorsNewClient = () => {
  return useQuery({
    queryKey: ['sectors-new-client'],
    queryFn: getSectorsNewClient,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};