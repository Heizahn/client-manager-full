import { useMutation, useQuery } from '@tanstack/react-query';

const getServiceByNewClient = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(apiUrl + '/api/services/new-client');
    if (!response.ok) {
      throw new Error('Error en la petición');
    }
  
    return await response.json();
  };

export const useServicesNewClient = () => {
    return useQuery({
      queryKey: ['services-new-client'],
      queryFn: getServiceByNewClient,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    });
}