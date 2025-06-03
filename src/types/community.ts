export interface Community {
  id: string;
  name: string;
  description: string;
  image?: string;
  tokenSymbol: string;
  tokenName: string;
  contractAddress: string;
  treasuryBalance: number;
  memberCount: number;
  proposalCount: number;
  createdAt: Date;
  updatedAt: Date;
  settings: CommunitySettings;
  creator: string; // wallet address
}

export interface CommunitySettings {
  isPublic: boolean;
  requiresApproval: boolean;
  votingPeriod: number; // in days
  quorumPercentage: number;
  proposalThreshold: number; // minimum tokens needed to create proposal
  categories: string[];
}

export interface CommunityMember {
  id: string;
  walletAddress: string;
  username?: string;
  role: MemberRole;
  tokenBalance: number;
  joinedAt: Date;
  lastActive: Date;
  votingPower: number;
}

export enum MemberRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member'
}

export interface CommunityStats {
  totalMembers: number;
  totalTokenSupply: number;
  treasuryValue: number;
  activeProposals: number;
  totalProposals: number;
  avgVotingParticipation: number;
} 