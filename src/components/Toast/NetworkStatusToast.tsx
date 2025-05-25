import React, {useEffect, useState, useRef} from 'react';
import {Text, Animated, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NetworkStatusToast: React.FC = () => {
	const [isConnected, setIsConnected] = useState<boolean | null>(null);
	const [shouldShow, setShouldShow] = useState<boolean>(false);
	const [showReconnectedMessage, setShowReconnectedMessage] = useState<boolean>(false);
	const translateY = useRef(new Animated.Value(-60)).current;
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	
	useEffect(() => {
		// Check initial network status when app opens
		NetInfo.fetch().then(state => {
			const initialConnected = state.isConnected;
			setIsConnected(initialConnected);
			
			// If no internet on initial load, show the badge
			if (initialConnected === false) {
				setShouldShow(true);
				showBadge();
			}
		});
		
		// Subscribe to network status changes
		const unsubscribe = NetInfo.addEventListener(state => {
			const previousConnected = isConnected;
			const newConnected = state.isConnected;
			
			// Only respond to actual connection changes
			if (previousConnected !== null && newConnected !== previousConnected) {
				if (newConnected === false) {
					// Lost connection - show badge and keep it visible
					setShouldShow(true);
					setShowReconnectedMessage(false);
					showBadge();
				} else if (newConnected === true) {
					// Connection restored - show reconnected message
					setShouldShow(true);
					setShowReconnectedMessage(true);
					
					// Clear any existing timeout
					if (timeoutRef.current) {
						clearTimeout(timeoutRef.current);
					}
					
					showBadge();
					
					// Hide after 3 seconds
					timeoutRef.current = setTimeout(() => {
						Animated.timing(translateY, {
							toValue: -60,
							duration: 300,
							useNativeDriver: true,
						}).start(() => {
							setShouldShow(false);
							setShowReconnectedMessage(false);
						});
					}, 3000);
				}
			}
			
			setIsConnected(newConnected);
		});
		
		return () => {
			unsubscribe();
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [isConnected]);
	
	const showBadge = () => {
		Animated.timing(translateY, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};
	
	if (!shouldShow) return null;
	
	return (
		<Animated.View
			className="absolute top-0 left-0 right-0 items-center justify-center z-50"
			style={{
				paddingVertical: 10,
				paddingTop: Platform.OS === 'ios' ? 50 : 30,
				backgroundColor: showReconnectedMessage ? '#4caf50' : '#f44336',
				transform: [{translateY}],
			}}
		>
			<Text className="text-white font-bold text-base">
				{showReconnectedMessage
					? 'Internet connection is back'
					: 'No internet connection'}
			</Text>
		</Animated.View>
	);
};

export default NetworkStatusToast;