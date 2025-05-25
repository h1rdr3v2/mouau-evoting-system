import React from 'react';
import {Text, View} from "react-native";
import {OverylayImageView} from "@/components/OverlayImageView";

const FreeFairElectionBanner = () => (
	<View className='flex-1 relative justify-center'>
		<OverylayImageView
			image={require("@/assets/images/freeandfair.webp")}
			className='aspect-[370/96]'
			containerClassName='rounded-2xl max-h-[96px]'
		/>
		<Text className="absolute w-full text-center text-white font-montserrat-bold">
			Say <Text className='text-green-500 text-xl'>YES</Text> to Free and Fair
			Elections</Text>
	</View>
)

export default FreeFairElectionBanner;