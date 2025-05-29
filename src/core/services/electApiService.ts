import {USE_MOCK_DATA} from "@/core/data/config";
import {mockElections} from "@/core/data/mockElections";
import {mockPositions} from "@/core/data/mockPositions";
import {mockCandidates} from "@/core/data/mockCandidates";
import {CandidateApiData, ElectionPayload, PositionsCandidatesResult} from "@/core/types/Election";

// Create API service with the same methods as before
export const electApiService = {
	getElections: async (): Promise<{
		success: boolean;
		elections?: ElectionPayload[];
	}> => {
		if (USE_MOCK_DATA) {
			await new Promise(resolve => setTimeout(resolve, 900)); // Wait for 200ms
			return {
				success: true,
				elections: mockElections,
			};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/login', {...})
				// const data = await response.json();
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('news error:', error);
				return {success: false};
			}
		}
	},
	getElection: async (electionId: string): Promise<{
		success: boolean;
		election?: ElectionPayload;
	}> => {
		if (USE_MOCK_DATA) {
			await new Promise(resolve => setTimeout(resolve, 400)); // Wait for 200ms
			return {
				success: true,
				election: mockElections.filter(election => election.id === electionId)[0],
			};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/login', {...})
				// const data = await response.json();
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('news error:', error);
				return {success: false};
			}
		}
	},
	getPositionsAndCandidates: async (electionId: string): Promise<{
		success: boolean;
		data?: PositionsCandidatesResult;
	}> => {
		if (USE_MOCK_DATA) {
			await new Promise(resolve => setTimeout(resolve, 400)); // Wait for 200ms
			
			// Filter positions for the given election
			const electionPositions = mockPositions.filter(
				(position) => position.electionId === electionId
			);
			
			// Sort positions by order
			const sortedPositions = [...electionPositions].sort((a, b) => a.order - b.order);
			
			// Filter candidates for the given election
			const electionCandidates = mockCandidates.filter(
				(candidate) => candidate.electionId === electionId
			);
			
			// Organize by positions
			const result: PositionsCandidatesResult = {};
			
			sortedPositions.forEach((position) => {
				// Find candidates for this position
				const positionCandidates = electionCandidates.filter(
					(candidate) => candidate.positionId === position.id
				);
				
				// Add position info to result
				result[position.title] = {
					candidates: positionCandidates,
					maxSelections: position.maxSelections,
				};
			});
			
			// return result;
			return {
				success: true,
				data: result,
			};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/login', {...})
				// const data = await response.json();
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('news error:', error);
				return {success: false};
			}
		}
	},
	getCandidate: async (candidateId: string): Promise<{
		success: boolean;
		data?: CandidateApiData;
	}> => {
		if (USE_MOCK_DATA) {
			await new Promise(resolve => setTimeout(resolve, 400)); // Wait for 200ms
			
			// Filter positions for the given election
			const candidate = mockCandidates.filter(
				(candidate) => candidate.id === candidateId
			);
			
			// return result;
			return {
				success: true,
				data: candidate[0],
			};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/login', {...})
				// const data = await response.json();
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('news error:', error);
				return {success: false};
			}
		}
	},
	submitVote: async (electionId: string): Promise<{
		success: boolean;
		// data?: CandidateApiData;
	}> => {
		if (USE_MOCK_DATA) {
			await new Promise(resolve => setTimeout(resolve, 400)); // Wait for 200ms
			
			// return result;
			return {
				success: true,
				// data: candidate[0],
			};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/login', {...})
				// const data = await response.json();
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('news error:', error);
				return {success: false};
			}
		}
	}
};