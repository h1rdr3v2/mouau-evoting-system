// Type for accessing Colors by theme
export type AppColors = {
	primary: string;
	text: string;
	background: string;
	navigation: {
		border: string;
		header: {
			background: string;
			tint: string;
			text: string;
		};
		content: {
			background: string;
		};
	};
};