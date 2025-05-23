import {useQuery} from '@tanstack/react-query';
import {electApiService} from "@/core/services/electApiService";
import {format, isPast, isFuture} from 'date-fns';

export function getElections() {
	return useQuery({
		queryKey: ['elections'],
		queryFn: () => electApiService.getElections(),
		staleTime: 0,
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		select: (data) => {
			if (!data?.elections) return {upcoming: [], ongoing: [], success: data?.success};
			
			// Process each election
			const processedElections = data.elections.map(election => {
				const startDate = new Date(election.startDate);
				const endDate = new Date(election.endDate);
				
				return {
					...election,
					startTimestamp: startDate.getTime(),
					endTimestamp: endDate.getTime(),
					formattedStartDate: format(startDate, 'dd/MM/yyyy'),
					formattedEndDate: format(endDate, 'dd/MM/yyyy'),
					// Dynamic status based on dates
					dateBasedStatus: isPast(startDate) && isFuture(endDate) ? 'ongoing' : isFuture(startDate) ? 'upcoming' : 'ended'
				};
			});
			
			// Sort and filter into upcoming and ongoing arrays
			const upcoming = processedElections
				.filter(election => isFuture(new Date(election.startDate)))
				.sort((a, b) => a.startTimestamp - b.startTimestamp);
			
			const ongoing = processedElections
				.filter(election => {
					const start = new Date(election.startDate);
					const end = new Date(election.endDate);
					return isPast(start) && isFuture(end);
				})
				.sort((a, b) => a.endTimestamp - b.endTimestamp);
			
			return {
				upcoming,
				ongoing,
				allElections: processedElections,
				success: data.success
			};
		}
	});
}