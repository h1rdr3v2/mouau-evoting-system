import {router} from "expo-router";
import React, {useState} from 'react';
import {Checkbox} from 'expo-checkbox';
import {useAuth} from "@/core/queries/useAuth";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedInput} from "@/components/ThemedInput";
import {ThemedButton} from "@/components/ThemedButton";
import {Image, KeyboardAvoidingView, ScrollView, Text, View, Platform, Pressable} from "react-native";

function LoginScreen() {
	const [isChecked, setChecked] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState<string>('');
	const {login, isLoading, loginError} = useAuth();
	
	const goToVerification = async () => {
		const response: boolean = (await login(inputValue)).success;
		if (!response) {
			setError(loginError ? loginError.message : "Login failed");
		} else {
			router.push("/verification");
		}
	}
	
	const handleTextChange = (inputValue: string) => {
		setInputValue(inputValue);
		setError('');
	}
	return (
		<KeyboardAvoidingView
			style={{flex: 1}}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
		>
			<ScrollView
				bounces={false}
				style={{flex: 1}}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{flexGrow: 1}}
			>
				<View className="w-full h-[60vh] relative">
					<Text className='z-10 w-[300px] text-5xl/[50px] absolute text-white bottom-10 left-4 font-black'>
						A Citadel For Learning
					</Text>
					{/*Moaua school badge*/}
					<View
						className='z-10 absolute items-center justify-center flex top-safe right-4 bg-white rounded-lg h-[35px] w-36'>
						<Image
							source={require('@/assets/images/logo-transparent-label.png')}
							className='w-[90%]'
							resizeMode="contain"
						/>
					</View>
					<Image
						source={require('@/assets/auth/login-img-head.png')}
						className='w-full h-full'
						resizeMode='cover'
					/>
				</View>
				<ThemedView className='w-full px-4 flex-grow'>
					<ThemedText type='title' className='mt-6'>
						Login with your Matric Number
					</ThemedText>
					<ThemedInput
						placeholder="DEPT/20/111111"
						variant="outlined"
						size="large"
						leftIcon={<ThemedText>MOUAU/</ThemedText>}
						autoCorrect={false}
						autoCapitalize="characters"
						keyboardType="default"
						containerClassName='pt-6'
						error={error}
						onChangeText={handleTextChange}
					/>
					<View className='flex flex-row gap-3 w-full items-center mb-7'>
						<Checkbox
							value={isChecked}
							style={{borderRadius: 4}}
							onValueChange={setChecked}
							color={isChecked ? '#000' : undefined}
						/>
						<Pressable
							onPress={() => setChecked(!isChecked)}
							className='flex-1'
							android_ripple={{color: 'rgba(0,0,0,0.1)'}}
							style={({pressed}) => [
								{opacity: pressed ? 0.8 : 1}
							]}
						>
							<ThemedText className='opacity-70'>
								By logging in, you agree to the terms of service and school election rules.
							</ThemedText>
						</Pressable>
					</View>
					<ThemedButton
						title="Continue"
						disabled={!isChecked || inputValue === ''}
						loading={isLoading}
						size='large'
						onPress={goToVerification}
					/>
					<ThemedButton
						title='Need Help?'
						variant='text'
						size='large'
					/>
				</ThemedView>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default LoginScreen;
