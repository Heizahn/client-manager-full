import { useQuery } from '@tanstack/react-query';

const getRoutersNewClient = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + '/api/routers/new-client');
  if (!response.ok) {
    throw new Error('Error en la petición');
  }

  return await response.json();
};

export const useRoutersNewClient = () => {
  return useQuery({
    queryKey: ['routers-new-client'],
    queryFn: getRoutersNewClient,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};