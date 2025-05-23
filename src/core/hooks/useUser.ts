import {useAuthStore} from "@/core/stores/useAuthStore";
import {useMemo} from "react";

export function useUser() {
	const {isLoggedIn, user} = useAuthStore();
	
	const firstName = user?.name?.split(" ")?.[0];
	const lastName = user?.name?.split(" ")?.[1];
	const department = user?.department;
	const level = user?.level;
	
	return useMemo(() => ({
		user,
		firstName,
		lastName,
		fullName: user?.name,
		department,
		level,
		isLoggedIn,
	}), [user]);
}