import {SafeAreaView, type ViewProps} from 'react-native';


export type ThemedViewProps = ViewProps & {
	className?: string;
};

export function ThemedSafeAreaView({className = '', ...rest}: ThemedViewProps) {
	return <SafeAreaView className={` flex-1 bg-background-light dark:bg-background-dark ${className}`} {...rest} />;
}
