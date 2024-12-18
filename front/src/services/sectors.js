import { useQuery } from '@tanstack/react-query';
import { useFetchGet } from '../hooks/useFetch';

export const useSectors = () => {
	return useQuery({
		queryKey: ['sectors'],
		queryFn: () => useFetchGet('/api/sectors'),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: true,
	});
};

export const useSectorsNewClient = () => {
	return useQuery({
		queryKey: ['sectors-new-client'],
		queryFn: () => useFetchGet('/api/sectors/new-client'),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
	});
};
