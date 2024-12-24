import { useQuery } from '@tanstack/react-query';
import { useFetchGet as FetchGet } from '../hooks/useFetch';

export const useClients = () => {
	return useQuery({
		queryKey: ['clients'],
		queryFn: () => FetchGet('/api/clients'),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: true,
	});
};

export const useClientById = (id) => {
	return useQuery({
		queryKey: ['client', id],
		queryFn: () => FetchGet(`/api/clients/${id}`),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: true,
	});
};
