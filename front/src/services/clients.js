import {  useQuery,  } from '@tanstack/react-query';
import { useFetchGet } from '../hooks/useFetch';

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: () => useFetchGet('/api/clients'),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};

export const useClientById = (id) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => useFetchGet(`/api/clients/${id}`),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};

