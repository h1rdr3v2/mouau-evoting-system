import {useQuery} from '@tanstack/react-query';
import {newsApiService} from "@/core/services/newsApiService";
import {NewsApiResponse, TrendingNewsApiResponse} from "@/core/types/News";

export function getAllTrendingNews() {
	return useQuery<TrendingNewsApiResponse, Error>({
		queryKey: ['news'],
		staleTime: 1800,
		queryFn: () => newsApiService.getTrendingNews(),
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
}

export function getNewsById(id: string) {
	return useQuery<NewsApiResponse, Error>({
		queryKey: ['news', id],
		staleTime: 1800,
		queryFn: () => newsApiService.getNewsById(id),
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
}
