import {router} from "expo-router";
import React, {useState} from 'react';
import { Checkbox } from 'expo-checkbox';
import { UserRound } from "lucide-react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedInput} from "@/components/ThemedInput";
import {ThemedButton} from "@/components/ThemedButton";
import {Image, KeyboardAvoidingView, ScrollView, Text, View, Platform, Pressable} from "react-native";
import {useAuth} from "@/core/contexts/AuthContext";

function Login() {
    const [isChecked, setChecked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string>('');
    const { login } = useAuth();

    const goToVerification = async () => {
        const response: boolean = await login(inputValue);
        if (response) {
            router.push("/verification");
        }else{
            setError('Login failed!')
        }
    }

    const handleTextChange = (inputValue: string)=> {
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
                style={{flex: 1}}
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled"
            >
                <View className="w-full h-[60vh] relative">
                    <Text className='z-10 w-[300px] text-5xl/[50px] absolute text-white bottom-10 left-4 font-black'>
                        A Citadel For Learning
                    </Text>
                    <View className='z-10 absolute text-white flex justify-center top-safe right-4 bg-white px-3 rounded-lg h-[39px]'>
                        <Image
                            source={require('@/assets/images/logo-transparent-label.png')}
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
                        placeholder="MOUAU/CMP/20/111111"
                        variant="outlined"
                        size="large"
                        leftIcon={<UserRound size={24} color="#6b7280" />}
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
                        disabled={!isChecked}
                        size='large'
                        onPress={goToVerification}
                    />
                    <ThemedButton
                        title='Need Help?'
                        variant='text'
                    />
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Login;
