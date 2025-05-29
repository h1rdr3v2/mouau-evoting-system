import {
	ElectionApiResponse,
	ElectionPayload,
	ElectionQueryResult,
	ElectionsApiResponse,
	ElectionsQueryResult,
	PositionsCandidatesApiresponse,
	ProcessedElection,
} from "@/core/types/Election";
import {useMutation, useQuery} from '@tanstack/react-query';
import {format, isFuture, isPast} from 'date-fns';
import {electApiService} from "@/core/services/electApiService";

export function getElections() {
	return useQuery<ElectionsApiResponse, Error, ElectionsQueryResult>({
		queryKey: ['elections'],
		queryFn: () => electApiService.getElections(),
		staleTime: 6000, //1 minute
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		select: (data) => {
			if (!data?.elections) return {upcoming: [], ongoing: [], success: data?.success};
			
			// Process each election
			const processedElections = data.elections.map(election => processElection(election));
			
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

export function getElection(id: string) {
	return useQuery<ElectionApiResponse, Error, ElectionQueryResult>({
		queryKey: ['election', id],
		queryFn: () => electApiService.getElection(id),
		staleTime: 60000 * 5,
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		select: (data) => {
			if (!data?.election) return {success: data?.success};
			
			return {
				success: data.success,
				election: processElection(data.election)
			}
		}
	})
}

export function getPositionsAndCandidates(electionId: string) {
	return useQuery<PositionsCandidatesApiresponse, Error>({
		queryKey: ['positionsWithCandidates', electionId],
		queryFn: () => electApiService.getPositionsAndCandidates(electionId),
		staleTime: 6000,
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	})
}

const processElection = (election: ElectionPayload): ProcessedElection => {
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
}

export const useSubmitVote = () => {
	return useMutation({
		mutationFn: (electionId: string) => electApiService.submitVote(electionId),
	});
}