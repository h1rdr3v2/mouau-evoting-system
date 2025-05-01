import {Text, type TextProps} from 'react-native';

export type ThemedTextProps = TextProps & {
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'light';
	className?: string;
};

export function ThemedText({
							   type = 'default',
							   className = '',
							   ...rest
						   }: ThemedTextProps) {
	
	let textClasses = "";
	
	if (type === 'default') {
		textClasses += "text-base font-montserrat leading-6";
	} else if (type === 'defaultSemiBold') {
		textClasses += "text-base leading-6 font-montserrat-semibold";
	} else if (type === 'title') {
		textClasses += "text-3xl font-montserrat-bold leading-8";
	} else if (type === 'subtitle') {
		textClasses += "text-xl font-montserrat-bold";
	} else if (type === 'link') {
		textClasses += "text-base leading-7 font-montserrat text-[#0a7ea4]";
	} else if (type === 'light') {
		textClasses += "font-montserrat-light";
	}
	
	return (
		<Text
			className={`dark:text-text-dark ${textClasses} ${className}`}
			{...rest}
		/>
	);
}
