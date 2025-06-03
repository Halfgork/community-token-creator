export interface Member {
  id: string;
  walletAddress: string;
  username?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  lastActive: Date;
  isVerified: boolean;
  communities: MemberCommunity[];
}

export interface MemberCommunity {
  communityId: string;
  communityName: string;
  role: MemberRole;
  tokenBalance: number;
  joinedAt: Date;
  permissions: Permission[];
}

export enum MemberRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member'
}

export enum Permission {
  CREATE_PROPOSAL = 'create_proposal',
  VOTE_PROPOSAL = 'vote_proposal',
  MANAGE_MEMBERS = 'manage_members',
  MANAGE_TREASURY = 'manage_treasury',
  MANAGE_SETTINGS = 'manage_settings',
  MINT_TOKENS = 'mint_tokens',
  BURN_TOKENS = 'burn_tokens',
  FREEZE_ACCOUNTS = 'freeze_accounts'
}

export interface MemberInvitation {
  id: string;
  communityId: string;
  inviterAddress: string;
  inviteeEmail?: string;
  inviteeAddress?: string;
  role: MemberRole;
  status: InvitationStatus;
  expiresAt: Date;
  createdAt: Date;
  acceptedAt?: Date;
}

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired'
}

export interface MemberActivity {
  id: string;
  memberId: string;
  communityId: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, string | number | boolean>;
  timestamp: Date;
}

export enum ActivityType {
  JOINED_COMMUNITY = 'joined_community',
  LEFT_COMMUNITY = 'left_community',
  ROLE_CHANGED = 'role_changed',
  PROPOSAL_CREATED = 'proposal_created',
  VOTE_CAST = 'vote_cast',
  TOKENS_RECEIVED = 'tokens_received',
  TOKENS_SENT = 'tokens_sent'
} 