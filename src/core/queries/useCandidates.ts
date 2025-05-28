import {useQuery} from "@tanstack/react-query";
import {CandidateApiResponse} from "@/core/types/Election";
import {electApiService} from "@/core/services/electApiService";

export const getCandidate = (candidateId: string) => {
	return useQuery<CandidateApiResponse, Error>({
		queryKey: ['candidateId', candidateId],
		queryFn: () => electApiService.getCandidate(candidateId),
		staleTime: 6000,
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	})
}