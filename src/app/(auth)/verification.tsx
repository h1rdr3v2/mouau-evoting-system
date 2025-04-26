import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView, Platform, View, Text, Image} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';


function Verification() {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

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
                <ThemedView className='flex flex-col flex-grow items-center px-4'>
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

                    {/*Code input here*/}
                    <View className='w-full'>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={4}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode" // enables auto-fill
                            renderCell={({index, symbol, isFocused}) => (
                                <ThemedView
                                    key={index}
                                    className="flex-1 h-24 border-2 rounded-md mx-2 border-gray-300 items-center justify-center"
                                    style={isFocused && {borderColor: '#000'}}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    <ThemedText className="text-xl font-montserrat-medium">
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </ThemedText>
                                </ThemedView>
                            )}
                        />
                    </View>
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Verification;
