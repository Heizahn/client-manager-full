import {  useQuery } from '@tanstack/react-query';
import { useFetchGet } from '../hooks/useFetch';

export const useServicesNewClient = () => {
    return useQuery({
      queryKey: ['services-new-client'],
      queryFn: () => useFetchGet('/api/services/new-client'),
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    });
}

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => useFetchGet('/api/services'),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

