import React, {useEffect, useState, useRef} from 'react';
import {Text, Animated, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NetworkStatusToast: React.FC = () => {
	const [shouldShow, setShouldShow] = useState<boolean>(false);
	const [showReconnectedMessage, setShowReconnectedMessage] = useState<boolean>(false);
	const translateY = useRef(new Animated.Value(-60)).current;
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const lastConnectionState = useRef<boolean | null>(null);
	
	// Helper function to hide the badge
	const hideBadge = () => {
		Animated.timing(translateY, {
			toValue: -60,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setShouldShow(false);
			setShowReconnectedMessage(false);
		});
	};
	
	// Helper function to show the badge
	const showBadge = () => {
		Animated.timing(translateY, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};
	
	useEffect(() => {
		// Check initial network status when app opens
		NetInfo.fetch().then(state => {
			lastConnectionState.current = state.isConnected;
			
			// If no internet on initial load, show the badge
			if (state.isConnected === false) {
				setShouldShow(true);
				showBadge();
			}
		});
		
		// Subscribe to network status changes
		const unsubscribe = NetInfo.addEventListener(state => {
			const currentConnected = state.isConnected;
			const previousConnected = lastConnectionState.current;
			
			// Only respond to actual connection changes
			if (previousConnected !== null && currentConnected !== previousConnected) {
				if (currentConnected === false) {
					// Lost connection - show badge and keep it visible
					setShouldShow(true);
					setShowReconnectedMessage(false);
					
					// Clear any existing timeout
					if (timeoutRef.current) {
						clearTimeout(timeoutRef.current);
						timeoutRef.current = null;
					}
					
					showBadge();
				} else if (currentConnected === true && !previousConnected) {
					// Connection restored - show reconnected message
					setShouldShow(true);
					setShowReconnectedMessage(true);
					
					// Clear any existing timeout
					if (timeoutRef.current) {
						clearTimeout(timeoutRef.current);
						timeoutRef.current = null;
					}
					
					showBadge();
					
					// Hide after 3 seconds
					timeoutRef.current = setTimeout(() => {
						hideBadge();
						timeoutRef.current = null;
					}, 3000);
				}
			}
			
			// Update the last known connection state
			lastConnectionState.current = currentConnected;
		});
		
		return () => {
			unsubscribe();
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, []);
	
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