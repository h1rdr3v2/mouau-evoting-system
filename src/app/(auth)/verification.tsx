import {router} from "expo-router";
import React, {useState} from 'react';
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {ThemedButton} from "@/components/ThemedButton";
import {KeyboardAvoidingView, ScrollView, Platform, View, Image, TextInput, Alert} from "react-native";
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {useAuth} from "@/core/contexts/AuthContext";
import {ThemeToggle} from "@/components/ThemeToggle";

const CELL_COUNT = 4;

function VerificationScreen() {
	const [value, setValue] = useState('');
	const {verifyOtp} = useAuth();
	
	const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	
	const handleFullLogin = async () => {
		const response: boolean = await verifyOtp(value)
		if (response) {
			router.replace('/')
		} else {
			Alert.alert("Incorrect OTP", "The otp you entered is incorrect please try again.")
		}
	}
	
	return (
		<KeyboardAvoidingView
			style={{flex: 1}}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
		>
			<ScrollView
				style={{flex: 1}}
				contentContainerStyle={{flexGrow: 1}}
				keyboardShouldPersistTaps="handled"
			>
				<ThemedView className='flex flex-col flex-grow items-center px-4'>
					<View className='my-12'>
						<Image
							source={require('@/assets/auth/verification-illustraion.png')}
						/>
					</View>
					<ThemedText type='title'>
						Verification Code
					</ThemedText>
					<ThemedText
						className='w-[288px] text-xs leading-[13px] text-center opacity-70 font-montserrat-medium mt-2 mb-8'>
						Enter the 4-digit verification code that was sent to your school email that ends in
						@mouau.edu.ng attached with your matric number
					</ThemedText>
					
					{/*Code input here*/}
					<View className='w-full mb-8'>
						<CodeField
							ref={ref}
							{...props}
							value={value}
							onChangeText={setValue}
							cellCount={CELL_COUNT}
							keyboardType="number-pad"
							textContentType="oneTimeCode" // enables auto-fill
							autoComplete={(Platform.select({
								android: 'sms-otp',
								default: 'one-time-code'
							})) as 'sms-otp' | 'one-time-code'}
							testID="verification-code-input"
							renderCell={({index, symbol, isFocused}) => (
								<ThemedView
									key={index}
									className="flex-1 h-24 border-2 rounded-md mx-2 border-gray-300 items-center justify-center"
									style={isFocused && {borderColor: '#000'}}
									onLayout={getCellOnLayoutHandler(index)}>
									<TextInput className="text-3xl font-montserrat-medium dark:text-text-dark">
										{symbol || (isFocused ? <Cursor/> : null)}
									</TextInput>
								</ThemedView>
							)}
						/>
						<View className='flex flex-row items-center gap-1 self-center pt-6'>
							<ThemedText>Didn’t get the code?</ThemedText>
							<ThemedButton
								title='Resend'
								variant='text'
								className='min-w-[0px] -ml-3'
							/>
						</View>
					</View>
					
					{/*Continue button*/}
					<ThemedButton
						title='Continue'
						size='large'
						className='w-full'
						onPress={handleFullLogin}
						disabled={value.length < CELL_COUNT}
					/>
				</ThemedView>
				<ThemeToggle/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default VerificationScreen;
