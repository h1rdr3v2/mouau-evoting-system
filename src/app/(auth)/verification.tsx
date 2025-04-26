import React from 'react';
import {KeyboardAvoidingView, ScrollView, Platform} from "react-native";
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
                <ThemedView className='flex flex-col items-center'>
                    <ThemedText type='title'>
                        Verification Code
                    </ThemedText>
                    <ThemedText className='w-[288px] leading-4 text-center opacity-70 font-medium text-xs mt-2'>
                        Enter the 4-digit verification code that was sent to your school email that ends in @mouau.edu.ng attached with your matric number
                    </ThemedText>
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Verification;
