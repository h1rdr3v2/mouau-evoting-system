import {useState} from "react";
import {router} from "expo-router";
import {Image, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OnboardingScreen = ( ) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slides.length;
    const insets = useSafeAreaInsets();
    const isLastSlide = currentSlide === totalSlides - 1;

    // Helper function
    const goToSlide = (index: number) => {
        // Do anything else
        setCurrentSlide(index);
    };

    // Navigation functions
    const handleNext = () => {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        } else {
            router.push('/login')
        }
    };

    const handlePrev = () => {
        if(isLastSlide) {
            router.push('//help') // Need help button clicked
        }else if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    };

    const handleSkip = () => {
        goToSlide(totalSlides - 1);
    };


    return (
        <ThemedView className="flex-1" style={{paddingBottom: insets.bottom}}>
            <View className="w-full h-[70%] relative">
                <View style={{zIndex: 10, top: insets.top}} className="absolute right-0" >
                    <ThemedButton
                        title="Skip"
                        variant='text'
                        className={!isLastSlide ? 'block' : 'hidden'}
                        textClassName='color-black dark:color-black'
                        onPress={handleSkip}
                    />
                </View>
                <Image
                    source={require('@/assets/auth/onboard-1.jpg')}
                    className='w-full h-full'
                    resizeMode='cover'
                />
            </View>

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
                        title={!isLastSlide ? 'Next' : 'Login with Student ID'}
                        variant="primary"
                        size="large"
                        onPress={handleNext}
                    />

                    <ThemedButton
                        title={!isLastSlide ? 'Back' : 'Need Help?'}
                        variant="text"
                        className={currentSlide > 0 ? 'block' : 'hidden'}
                        onPress={handlePrev}
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
