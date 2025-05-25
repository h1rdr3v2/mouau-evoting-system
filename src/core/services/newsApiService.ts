import {trendingNews} from '@/core/data/mockNews';
import {USE_MOCK_DATA} from "@/core/data/config";
import {NewsItemType} from "@/core/types/News";

// Create API service with the same methods as before
export const newsApiService = {
	getNews: async (): Promise<{
		success: boolean;
		trendingNews?: NewsItemType[];
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
	
};