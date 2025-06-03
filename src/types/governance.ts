export interface Proposal {
  id: string;
  title: string;
  description: string;
  category: ProposalCategory;
  proposer: string; // wallet address
  communityId: string;
  type: ProposalType;
  status: ProposalStatus;
  votingStart: Date;
  votingEnd: Date;
  createdAt: Date;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  totalVotes: number;
  quorumReached: boolean;
  executed: boolean;
  metadata?: ProposalMetadata;
}

export enum ProposalType {
  TREASURY_SPENDING = 'treasury_spending',
  MEMBER_MANAGEMENT = 'member_management',
  GOVERNANCE_CHANGE = 'governance_change',
  TOKEN_DISTRIBUTION = 'token_distribution',
  GENERAL = 'general'
}

export enum ProposalStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PASSED = 'passed',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  EXECUTED = 'executed'
}

export enum ProposalCategory {
  TREASURY = 'treasury',
  GOVERNANCE = 'governance',
  MEMBERSHIP = 'membership',
  DEVELOPMENT = 'development',
  MARKETING = 'marketing',
  OPERATIONS = 'operations'
}

export interface ProposalMetadata {
  amount?: number;
  recipient?: string;
  targetMember?: string;
  newRole?: string;
  parameters?: Record<string, any>;
}

export interface Vote {
  id: string;
  proposalId: string;
  voter: string; // wallet address
  choice: VoteChoice;
  weight: number; // voting power at time of vote
  reason?: string;
  createdAt: Date;
}

export enum VoteChoice {
  FOR = 'for',
  AGAINST = 'against',
  ABSTAIN = 'abstain'
}

export interface GovernanceStats {
  totalProposals: number;
  activeProposals: number;
  passedProposals: number;
  rejectedProposals: number;
  avgParticipationRate: number;
  totalVotesCast: number;
} 