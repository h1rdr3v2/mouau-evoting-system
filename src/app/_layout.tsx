import "../../global.css";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {AuthProvider} from "@/core/contexts/AuthContext";
import {ThemeProvider} from "@/core/contexts/ThemeContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function RootLayout() {
  return (
      <GestureHandlerRootView style={{flex: 1}}>
          <ThemeProvider>
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
          </ThemeProvider>
      </GestureHandlerRootView>
  );
}
