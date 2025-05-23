import {ImageSourcePropType} from "react-native";

export interface NewsItemType {
	id: string;
	image: ImageSourcePropType;
	title: string;
	readTime: string;
}