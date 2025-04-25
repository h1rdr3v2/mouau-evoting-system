export type Position = {
    id: string;
    title: string;
    description: string;
};

export type Candidate = {
    id: string;
    userId: string;
    name: string;
    position: Position;
    positionId: string;
    manifesto: string;
    imageUrl: string;
    department: string;
    level: number;
    votes: number;
};

export type Election = {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'upcoming' | 'active' | 'completed';
    positions: Position[];
    candidates: Candidate[];
    totalVotes: number;
    isPublished: boolean;
};

export type Vote = {
    id: string;
    electionId: string;
    positionId: string;
    candidateId: string;
    userId: string;
    timestamp: string;
    confirmed: boolean;
};

export type VoteReceipt = {
    voteId: string;
    electionTitle: string;
    candidateName: string;
    position: string;
    timestamp: string;
    verificationCode: string;
};
