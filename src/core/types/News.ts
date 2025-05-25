import {ImageSourcePropType} from "react-native";

export interface NewsItemType {
	id: string;
	image: ImageSourcePropType;
	title: string;
	readTime: string;
	date: string;
	story: string;
}

export type TrendingNews = Omit<NewsItemType, 'date' | 'story'>

// API response for trending news
export interface TrendingNewsApiResponse {
	success: boolean;
	trendingNews?: TrendingNews[];
}

export interface NewsApiResponse {
	success: boolean;
	newsData?: NewsItemType;
}