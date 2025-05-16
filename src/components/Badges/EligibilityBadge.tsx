import {Badge, BadgeProps} from "./Badge";

interface EligibilityBadgeProps extends Omit<BadgeProps, 'iconName' | 'iconColor' | 'backgroundColor' | 'textColor'> {
	/** Whether the user is eligible */
	isEligible?: boolean;
	/** Optional custom label text */
	label?: string;
	/** Additional className */
	className?: string;
}

const EligibilityBadge = ({
							  isEligible = true,
							  label,
							  className,
							  ...badgeProps
						  }: EligibilityBadgeProps) => {
	const status = {
		eligible: {
			iconName: 'checkmark-circle',
			iconColor: '#16a34a',
			backgroundColor: 'bg-green-300/20',
			textColor: 'text-green-600',
			defaultLabel: 'Eligible to vote'
		},
		ineligible: {
			iconName: 'close-circle',
			iconColor: '#dc2626',
			backgroundColor: 'bg-red-300/20',
			textColor: 'text-red-600',
			defaultLabel: 'Not eligible to vote'
		}
	};
	
	const currentStatus = isEligible ? status.eligible : status.ineligible;
	
	return (
		<Badge
			iconName={currentStatus.iconName}
			iconColor={currentStatus.iconColor}
			backgroundColor={currentStatus.backgroundColor}
			textColor={currentStatus.textColor}
			label={label || currentStatus.defaultLabel}
			className={className}
			{...badgeProps}
		/>
	);
};

export default EligibilityBadge;