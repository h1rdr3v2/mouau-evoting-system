import {useQuery} from '@tanstack/react-query';
import {electApiService} from "@/core/services/electApiService";

export function getElections() {
	return useQuery({
		queryKey: ['news'],
		queryFn: () => electApiService.getElections(),
		staleTime: 0,
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
}