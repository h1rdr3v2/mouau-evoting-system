import {View, type ViewProps} from 'react-native';


export type ThemedViewProps = ViewProps & {
	className?: string;
};

export function ThemedView({className = '', ...rest}: ThemedViewProps) {
	return <View className={` bg-background-light dark:bg-background-dark ${className}`} {...rest} />;
}
