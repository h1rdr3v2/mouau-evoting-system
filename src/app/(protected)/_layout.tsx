import { Redirect, Stack } from "expo-router";
import {useAuthStore} from "@/src/core/stores/authStore";

export default function ProtectedLayout() {
    const loggedIn = useAuthStore( state => state.loggedIn);

    if (!loggedIn) return <Redirect href="/login" />;

    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
