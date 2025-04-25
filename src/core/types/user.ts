export type User = {
    id: string | number;
    studentId: string;
    name: string;
    email: string;
    department: string;
    level: number;
    isVerified: boolean;
    role: 'student' | 'admin' | 'electoral_officer';
    profileImage?: string;
};
