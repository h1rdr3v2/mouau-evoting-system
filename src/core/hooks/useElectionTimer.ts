import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

// Hook for countdown timer
export const useElectionTimer = (
	timestamp: string | number | undefined
) => {
	const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number; seconds: number }>({
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	
	useEffect(() => {
		if (!timestamp) return;
		
		// Handle both string dates and millisecond timestamps
		let targetDate: number;
		if (typeof timestamp === 'string') {
			// Try parsing the string as a date
			targetDate = new Date(timestamp).getTime();
		} else {
			// Already a number (milliseconds)
			targetDate = timestamp;
		}
		
		// Update the timer every second when app is in foreground
		const updateTimer = () => {
			const now = Date.now();
			const diff = Math.max(0, targetDate - now);
			
			if (diff > 0) {
				const hours = Math.floor(diff / (1000 * 60 * 60));
				const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((diff % (1000 * 60)) / 1000);
				
				setTimeRemaining({hours, minutes, seconds});
			} else {
				setTimeRemaining({hours: 0, minutes: 0, seconds: 0});
			}
		};
		
		// Check elapsed time when app becomes active again
		const handleAppStateChange = (nextAppState: string) => {
			if (nextAppState === 'active') {
				updateTimer();
			}
		};
		
		const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
		
		// Start the interval
		const timerInterval = setInterval(updateTimer, 1000);
		updateTimer(); // Initial update
		
		return () => {
			clearInterval(timerInterval);
			appStateSubscription.remove();
		};
	}, [timestamp]);
	
	// Format time as "2h 20m 49s"
	return {
		formattedTime: `${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`,
		...timeRemaining,
	}
};