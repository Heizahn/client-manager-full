import { useQuery } from '@tanstack/react-query';
import { useFetchGet as FetchGet } from '../hooks/useFetch';

export const useProfiles = () => {
	return useQuery({
		queryKey: ['profiles'],
		queryFn: () => FetchGet('/api/auth/all-profiles'),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
	});
};
