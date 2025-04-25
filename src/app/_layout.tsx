import "../../global.css";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
      <>
        <StatusBar style="auto" />
        <Stack screenOptions={{
            headerShown: false,
            animation: "none",
        }}
        >
          <Stack.Screen name="(protected)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </>
  );
}
