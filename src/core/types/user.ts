export type User = {
	id: number;
	regNo: string;
	name: string;
	email: string;
	department: string;
	level: number;
	role: 'student' | 'admin' | 'electoral_officer';
	profileImage?: string;
};
