import "../../global.css";
import {StatusBar} from "expo-status-bar";
import {SplashScreen, Stack} from "expo-router";
import React, {useEffect, useState} from "react";
import {AuthProvider} from "@/core/contexts/AuthContext";
import {ThemeProvider} from "@/core/contexts/ThemeContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as Network from 'expo-network'
import {onlineManager} from '@tanstack/react-query'

onlineManager.setEventListener((setOnline) => {
	const eventSubscription = Network.addNetworkStateListener((state) => {
		setOnline(!!state.isConnected)
	})
	return eventSubscription.remove
})

// Fonts montserrat
import {
	useFonts,
	Montserrat_100Thin,
	Montserrat_200ExtraLight,
	Montserrat_300Light,
	Montserrat_400Regular,
	Montserrat_500Medium,
	Montserrat_600SemiBold,
	Montserrat_700Bold,
	Montserrat_800ExtraBold,
	Montserrat_900Black,
} from '@expo-google-fonts/montserrat';

function AppContent() {
	const [appIsReady, setAppIsReady] = useState(false);
	
	const [fontsLoaded] = useFonts({
		Montserrat_100Thin,
		Montserrat_200ExtraLight,
		Montserrat_300Light,
		Montserrat_400Regular,
		Montserrat_500Medium,
		Montserrat_600SemiBold,
		Montserrat_700Bold,
		Montserrat_800ExtraBold,
		Montserrat_900Black,
	});
	
	useEffect(() => {
		if (fontsLoaded) {
			setAppIsReady(true);
		}
	}, [fontsLoaded]);
	
	useEffect(() => {
		const hideSplash = async () => {
			if (appIsReady) {
				await SplashScreen.hideAsync();
			}
		};
		
		hideSplash().then();
	}, [appIsReady]);
	
	if (!appIsReady) {
		return null;
	}
	
	return (
		<>
			<StatusBar style="auto"/>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "none",
				}}
			>
				<Stack.Screen name="(protected)"/>
				<Stack.Screen name="(auth)"/>
				<Stack.Screen name="+not-found" options={{title: 'Not Found'}}/>
			</Stack>
		</>
	);
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<AuthProvider>
						<AppContent/>
					</AuthProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}
