import React, {useState} from 'react';
import { Checkbox } from 'expo-checkbox';
import { UserRound } from "lucide-react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedInput} from "@/components/ThemedInput";
import {ThemedButton} from "@/components/ThemedButton";
import {Image, KeyboardAvoidingView, ScrollView, Text, View, Platform} from "react-native";

function Login() {
    const [isChecked, setChecked] = useState(false);

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
                    <Image
                        source={require('@/assets/auth/login-img-head.png')}
                        className='w-full h-full'
                        resizeMode='cover'
                    />
                </View>
                <ThemedView className='w-full pl-4 pr-4 flex-grow'>
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
                    />
                    <View className='flex flex-row gap-3 items-center justify-center mb-7'>
                        <Checkbox
                            value={isChecked}
                            style={{borderRadius: 4}}
                            onValueChange={setChecked}
                            color={isChecked ? '#000' : undefined}
                        />
                        <ThemedText className='opacity-70'>
                            By logging in, you agree to the terms of service and school election rules.
                        </ThemedText>
                    </View>
                    <ThemedButton
                        title="Continue"
                        disabled={!isChecked}
                        size='large'
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
