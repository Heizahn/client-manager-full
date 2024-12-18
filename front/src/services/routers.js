import { useQuery } from '@tanstack/react-query';
import { useFetchGet } from '../hooks/useFetch';

export const useRoutersNewClient = () => {
	return useQuery({
		queryKey: ['routers-new-client'],
		queryFn: () => useFetchGet('/api/routers/new-client'),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
	});
};

export const useRouters = () => {
	return useQuery({
		queryKey: ['routers'],
		queryFn: () => useFetchGet('/api/routers'),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: true,
	});
};
