import "../../global.css";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {AuthProvider} from "@/core/contexts/AuthContext";

export default function RootLayout() {
  return (
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{
            headerShown: false,
            animation: "none",
        }}
        >
          <Stack.Screen name="(protected)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AuthProvider>
  );
}
