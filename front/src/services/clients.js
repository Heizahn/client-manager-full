import { useQuery } from '@tanstack/react-query';

const getClients = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + '/api/clients');
  if (!response.ok) {
    throw new Error('Error en la petición');
  }

  return await response.json();
};

const getClient = async (id) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + `/api/clients/${id}`);
  if (!response.ok) {
    throw new Error('Error en la petición');
  }

  return await response.json();
};

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};

export const useClientById = (id) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};