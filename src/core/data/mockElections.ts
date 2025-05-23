import {Election} from '@/core/types/Election';

export type ElectionPayload = Omit<Election, 'isPublished' | 'createdAt' | 'updatedAt' | 'createdBy'>;

export const mockElections: ElectionPayload[] = [
	{
		id: 'election1',
		title: 'NACOS Executive Elections 2025',
		description: 'Annual elections for the executive committee of the National Association of Computing Students.',
		startDate: '2025-03-15T09:00:00.000Z',
		endDate: '2025-03-18T18:00:00.000Z',
		status: 'active',
		totalVotes: 150,
	},
	{
		id: 'election2',
		title: 'NACOS Executive Elections 2025',
		description: 'Annual elections for the executive committee of the National Association of Computing Students.',
		startDate: '2025-04-10T09:00:00.000Z',
		endDate: '2025-04-12T18:00:00.000Z',
		status: 'upcoming',
		totalVotes: 0,
	}
];