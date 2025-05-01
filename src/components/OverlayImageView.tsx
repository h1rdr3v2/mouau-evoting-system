import {Image, View, ImageSourcePropType} from "react-native";
import React from "react";

export function OverylayImageView({
									  image,
									  className = '',
									  containerClassName = '',
									  ...props
								  }: { image: ImageSourcePropType; className?: string, containerClassName?: string }) {
	return (
		<View className={`overflow-hidden relative ${containerClassName}`}>
			<Image
				source={image}
				className={`w-full h-full ${className}`}
				resizeMode='cover'
				{...props}
			/>
			<View className='inset-0 bg-black/50 absolute'></View>
		</View>
	)
}