import React from 'react';
import {KeyboardAvoidingView, ScrollView, Platform, View, Image} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";


function Verification() {
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
                <ThemedView className='flex flex-col flex-grow items-center'>
                    <View className='my-12'>
                        <Image
                            source={require('@/assets/auth/verification-illustraion.png')}
                        />
                    </View>
                    <ThemedText type='title'>
                        Verification Code
                    </ThemedText>
                    <ThemedText className='w-[288px] text-xs leading-[13px] text-center opacity-70 font-montserrat-medium mt-2 mb-8'>
                        Enter the 4-digit verification code that was sent to your school email that ends in @mouau.edu.ng attached with your matric number
                    </ThemedText>
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Verification;
