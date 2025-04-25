import {useState} from "react";
import {View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OnboardingScreen = ( ) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slides.length;
    const insets = useSafeAreaInsets();
    
    return (
        <ThemedView className="flex-1" style={{paddingBottom: insets.bottom}}>
            <ThemedView style={{backgroundColor: 'gray'}} className="w-full flex-grow min-h-[50%]">
            </ThemedView>

            <ThemedView className="ml-4 mr-4 mt-5 flex flex-col gap-4">
                {/*Title and caption*/}
                <ThemedView className="flex flex-col gap-3 items-center">
                    <ThemedText type="title" className="text-center">Your Campus Voice Matters</ThemedText>
                    <ThemedText className="text-center">Shape your campus experience by participating in student elections and initiatives</ThemedText>
                </ThemedView>

                {/*Pagination Dots*/}
                <ThemedView className="flex flex-row justify-center gap-2" style={{marginBottom: 10}}>
                    {slides.map((_, index) => (
                        <View
                            key={`dot-${index}`}
                            className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-primary-light' : 'bg-gray-300'}`}
                        />
                    ))}
                </ThemedView>

                {/* Navigation Buttons */}
                <ThemedView className="mt-2 mb-4">
                    <ThemedButton
                        title={currentSlide < totalSlides - 1 ? 'Next' : 'Login with Student ID'}
                        variant="primary"
                        size="large"
                    />

                    <ThemedButton
                        title="Back"
                        variant="text"
                        className={`opacity-${currentSlide > 0 ? 1 : 0}`}
                        disabled={currentSlide === 0}
                    />
                </ThemedView>
            </ThemedView>
            <StatusBar style='dark' />
        </ThemedView>
    );
};

// Slide content data
const slides = [
    {
        image: require('@/assets/auth/onboard-1.jpg'),
        title: 'Your Campus Voice Matters',
        subtitle: 'Shape your campus experience by participating in student elections and initiatives.',
    },
    {
        image: require('@/assets/auth/onboard-2.jpg'),
        title: 'Stay Informed & Engaged',
        subtitle: 'Get updates on upcoming elections, candidate profiles, and important campus initiatives.',
    },
    {
        image: require('@/assets/auth/onboard-3.jpg'),
        title: 'Ready to Get Started?',
        subtitle: 'Sign in to cast your vote and make your voice heard on campus.',
    }
];

export default OnboardingScreen;
