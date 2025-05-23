// Position type (contest being voted on)
export type Position = {
	id: string;
	electionId: string;
	title: string;
	description?: string;
	maxSelections: number; // How many candidates a voter can select (usually 1)
	order: number; // Display order
};

// Candidate type
export type Candidate = {
	id: string;
	name: string;
	positionId: string;
	electionId: string;
	manifesto: string;
	imageUrl: string;
	votes: number;
	department: string;
	level: number;
	createdAt: string;
	updatedAt: string;
};

// Type for vote
export type SubmittedVote = {
	positionId: string;
	candidateId: string;
};

// VotePayload for sending vote to backend
export type VotePayload = {
	id: string;
	userId: string;
	electionId: string;
	votes: SubmittedVote[];
	timestamp: string;
};

// Election type
export type Election = {
	id: string;
	title: string;
	description: string;
	startDate: string; // ISO date string
	endDate: string; // ISO date string
	status: 'upcoming' | 'active' | 'completed';
	isPublished: boolean;
	totalVotes: number;
	createdBy: string; // admin userId
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
};

// VoterStatus type (tracking if a user has voted for a position)
export type VoterStatus = {
	id: string;
	userId: string;
	electionId: string;
	hasVoted: boolean;
	votedAt: string;
};

export type VoteReceipt = {
	voteId: string;
	electionTitle: string;
	candidateName: string;
	position: string;
	timestamp: string;
	verificationCode: string;
};
