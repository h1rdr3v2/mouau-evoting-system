import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {Badge, BadgeProps} from "./Badge";

interface VotingStatusBadgeProps extends Omit<BadgeProps, 'iconName' | 'iconColor' | 'backgroundColor' | 'textColor'> {
	/** Whether the user has voted */
	hasVoted?: boolean;
	/** Optional custom label text */
	label?: string;
	/** Additional className */
	className?: string;
}

const VotingStatusBadge = ({
							   hasVoted = false,
							   label,
							   className,
							   ...badgeProps
						   }: VotingStatusBadgeProps) => {
	// Animation value for pulsing effect
	const pulseAnim = useRef(new Animated.Value(1)).current;
	
	// Status configurations based on voting status
	const status = {
		hasVoted: {
			dotColor: '#16a34a',
			backgroundColor: 'bg-green-300/20',
			textColor: 'text-green-600',
			defaultLabel: 'Voted'
		},
		yetToVote: {
			dotColor: '#f97316', // Orange color for "yet to vote"
			backgroundColor: 'bg-orange-300/20',
			textColor: 'text-orange-600',
			defaultLabel: 'Yet to vote'
		}
	};
	
	const currentStatus = hasVoted ? status.hasVoted : status.yetToVote;
	
	// Pulsing animation for "yet to vote" status
	useEffect(() => {
		if (!hasVoted) {
			Animated.loop(
				Animated.sequence([
					Animated.timing(pulseAnim, {
						toValue: 1.2,
						duration: 1000,
						useNativeDriver: true,
					}),
					Animated.timing(pulseAnim, {
						toValue: 1,
						duration: 1000,
						useNativeDriver: true,
					})
				])
			).start();
		} else {
			// No animation for "voted" status
			pulseAnim.setValue(1);
		}
	}, [hasVoted, pulseAnim]);
	
	// Custom icon component (pulsing circle)
	const PulsingCircle = () => (
		<Animated.View
			style={{
				width: 10,
				height: 10,
				borderRadius: 5,
				backgroundColor: currentStatus.dotColor,
				marginRight: 5,
				transform: [{scale: hasVoted ? 1 : pulseAnim}]
			}}
		/>
	);
	
	return (
		<Badge
			icon={<PulsingCircle/>}
			backgroundColor={currentStatus.backgroundColor}
			textColor={currentStatus.textColor}
			label={label || currentStatus.defaultLabel}
			className={className}
			{...badgeProps}
		/>
	);
};

export default VotingStatusBadge;