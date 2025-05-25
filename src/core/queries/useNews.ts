import {useQuery} from '@tanstack/react-query';
import {newsApiService} from "@/core/services/newsApiService";

export function getAllNews() {
	return useQuery({
		queryKey: ['news'],
		staleTime: 1800,
		queryFn: () => newsApiService.getNews(),
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
}

export function getNews(id: string) {
	return useQuery({
		queryKey: ['news', id],
		staleTime: 1800,
		queryFn: () => newsApiService.getNews(),
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
}
