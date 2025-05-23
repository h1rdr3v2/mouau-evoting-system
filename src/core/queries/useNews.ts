import {useQuery} from '@tanstack/react-query';
import {newsApiService} from "@/core/services/newsApiService";

export function useNews() {
	return useQuery({
		queryKey: ['news'],
		queryFn: () => newsApiService.getNews(),
		staleTime: 0,
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
}