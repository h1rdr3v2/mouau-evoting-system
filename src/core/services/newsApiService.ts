import {USE_MOCK_DATA} from "@/core/data/config";
import {trendingNews} from '@/core/data/mockNews';
import {NewsItemType, TrendingNews} from "@/core/types/News";

// Create API service with the same methods as before
export const newsApiService = {
	getTrendingNews: async (): Promise<{
		success: boolean;
		trendingNews?: TrendingNews[];
	}> => {
		if (USE_MOCK_DATA) {
			await new Promise(resolve => setTimeout(resolve, 400)); // Wait for 200ms
			return {
				success: true,
				trendingNews: trendingNews,
			};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/login', {...})
				// const data = await response.json();
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('news error:', error);
				return {success: false};
			}
		}
	},
	getNewsById: async (newsId: string): Promise<{
		success: boolean;
		newsData?: NewsItemType;
	}> => {
		if (USE_MOCK_DATA) {
			await new Promise(resolve => setTimeout(resolve, 400)); // Wait for 200ms
			return {
				success: true,
				newsData: trendingNews.filter(news => news.id === newsId)[0],
			};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/login', {...})
				// const data = await response.json();
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('news error:', error);
				return {success: false};
			}
		}
	}
};