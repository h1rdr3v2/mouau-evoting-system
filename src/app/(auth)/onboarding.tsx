import {useState} from "react";
import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {slidesData} from "@/core/data/slidesData";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Image, ScrollView, View} from "react-native";
import {ThemedButton} from "@/components/ThemedButton";
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const OnboardingScreen = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const totalSlides = slidesData.length;
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
		if (isLastSlide) {
			router.push('//help') // Need help button clicked
		} else if (currentSlide > 0) {
			goToSlide(currentSlide - 1);
		}
	};
	
	const handleSkip = () => {
		goToSlide(totalSlides - 1);
	};
	
	// Get current slide data
	const currentSlideData = slidesData[currentSlide];
	
	return (
		<ScrollView
			bounces={false}
			style={{flex: 1}}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{paddingBottom: insets.bottom, flexGrow: 1}}
		>
			<View className="w-full h-[60vh] relative">
				<View style={{zIndex: 10, top: insets.top}} className="absolute right-0">
					<ThemedButton
						title="Skip"
						variant='text'
						className={!isLastSlide ? 'block' : 'hidden'}
						textClassName='color-black dark:color-black'
						onPress={handleSkip}
					/>
				</View>
				<Image
					source={currentSlideData.image}
					className='w-full h-full'
					resizeMode='cover'
				/>
			</View>
			<ThemedView className="mx-4 mt-5 flex flex-col gap-4">
				{/*Title and caption*/}
				<ThemedView className="flex flex-col gap-3 items-center">
					<ThemedText type="title"
								className="text-center max-w-[300px]">{currentSlideData.title}</ThemedText>
					<ThemedText className="text-center">{currentSlideData.subtitle}</ThemedText>
				</ThemedView>
				
				{/*Pagination Dots*/}
				<ThemedView className="flex flex-row justify-center gap-2 mb-2">
					{slidesData.map((_, index) => (
						<View
							key={`dot-${index}`}
							className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-primary-light' : 'bg-gray-300'}`}
						/>
					))}
				</ThemedView>
				
				{/* Navigation Buttons */}
				<ThemedView>
					<ThemedButton
						title={!isLastSlide ? 'Next' : 'Login with Student ID'}
						variant="primary"
						size="large"
						onPress={handleNext}
					/>
					
					{/*Back or help button*/}
					<ThemedButton
						title={!isLastSlide ? 'Back' : 'Need Help?'}
						variant='text'
						size="large"
						className={currentSlide > 0 ? 'block' : 'invisible'}
						onPress={handlePrev}
					/>
				</ThemedView>
			</ThemedView>
			<StatusBar style='dark'/>
		</ScrollView>
	);
};

export default OnboardingScreen;
