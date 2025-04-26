import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="login" />
            <Stack.Screen name="verification" options={{
                headerShown: true,
                title: "",
                headerBackTitle: "Back" }}
            />
        </Stack>
    );
}
