import {Position} from "@/core/types/Election";

export const mockPositions: Position[] = [
	{
		id: 'pos1',
		electionId: '1',
		title: 'President',
		description: 'Overall leader of the association',
		maxSelections: 1,
		order: 1
	},
	{
		id: 'pos2',
		electionId: '1',
		title: 'Vice President',
		description: 'Deputy leader who assists the president',
		maxSelections: 1,
		order: 1
	},
	{
		id: 'pos3',
		electionId: '1',
		title: 'General Secretary',
		description: 'Responsible for documentation and communication',
		maxSelections: 1,
		order: 1
	},
	{
		id: 'pos4',
		electionId: '1',
		title: 'Financial Secretary',
		description: 'Manages financial records and transactions',
		maxSelections: 1,
		order: 1
	},
	{
		id: 'pos5',
		electionId: '1',
		title: 'Public Relations Officer',
		description: 'Manages public image and communication',
		maxSelections: 1,
		order: 1
	},
];
