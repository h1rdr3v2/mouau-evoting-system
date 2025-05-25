import {mockPositions} from "@/core/data/mockPositions";
import {ElectionPayload, Position} from '@/core/types/Election';

export const mockElections: ElectionPayload[] = [
	{
		id: 'election1',
		title: 'NACOS Executive Elections 2025',
		description: 'Annual elections for the executive committee of the National Association of Computing Students.',
		startDate: '2025-03-15T09:00:00.000Z',
		endDate: '2026-03-18T18:00:00.000Z',
		positions: countElectionPositions('election1', mockPositions),
		status: 'active',
		totalVotes: 150,
	},
	{
		id: 'election2',
		title: 'Computer Science Rep 2025',
		description: 'Annual elections for the executive committee of the National Association of Computing Students.',
		startDate: '2026-04-10T09:00:00.000Z',
		endDate: '2027-04-12T18:00:00.000Z',
		positions: countElectionPositions('election2', mockPositions),
		status: 'upcoming',
		totalVotes: 0,
	}
];

/**
 * Counts the number of positions for a specific election
 * @param electionId The ID of the election to count positions for
 * @param positions Array of all positions
 * @returns The number of positions for the specified election
 */
export function countElectionPositions(electionId: string, positions: Position[]): number {
	return positions.filter(position => position.electionId === electionId).length;
}
