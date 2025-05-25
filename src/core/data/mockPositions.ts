import {Position} from "@/core/types/Election";

export const mockPositions: Position[] = [
	{
		id: 'pos1',
		electionId: 'election1',
		title: 'President',
		description: 'Overall leader of the association',
		maxSelections: 1,
		order: 1
	},
	{
		id: 'pos2',
		electionId: 'election1',
		title: 'Vice President',
		description: 'Deputy leader who assists the president',
		maxSelections: 1,
		order: 2
	},
	{
		id: 'pos3',
		electionId: 'election1',
		title: 'General Secretary',
		description: 'Responsible for documentation and communication',
		maxSelections: 1,
		order: 3
	},
	{
		id: 'pos4',
		electionId: 'election2',
		title: 'Course Rep',
		description: 'Manages financial records and transactions',
		maxSelections: 1,
		order: 1
	},
	{
		id: 'pos5',
		electionId: 'election2',
		title: 'Assistant-Course Rep',
		description: 'Manages public image and communication',
		maxSelections: 1,
		order: 2
	},
];
