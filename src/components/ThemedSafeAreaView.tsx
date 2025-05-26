import {type ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
	className?: string;
};

export function ThemedSafeAreaView({className = '', ...rest}: ThemedViewProps) {
	return <SafeAreaView className={` flex-1 bg-background-light dark:bg-background-dark ${className}`} {...rest} />;
}
