// Stellar Network Configuration
export const STELLAR_NETWORK = {
  TESTNET: 'https://horizon-testnet.stellar.org',
  MAINNET: 'https://horizon.stellar.org',
  PASSPHRASE_TESTNET: 'Test SDF Network ; September 2015',
  PASSPHRASE_MAINNET: 'Public Global Stellar Network ; September 2015',
};

// Default community settings
export const DEFAULT_COMMUNITY_SETTINGS = {
  isPublic: true,
  requiresApproval: false,
  votingPeriod: 7, // days
  quorumPercentage: 20, // 20%
  proposalThreshold: 1000, // minimum tokens needed
  categories: ['general', 'treasury', 'governance', 'development'],
};

// Token configuration
export const TOKEN_CONFIG = {
  DEFAULT_DECIMALS: 7,
  MAX_SUPPLY: 1000000000, // 1 billion
  DEFAULT_INITIAL_SUPPLY: 1000000, // 1 million
};

// Voting configuration
export const VOTING_CONFIG = {
  MIN_VOTING_PERIOD: 1, // days
  MAX_VOTING_PERIOD: 30, // days
  MIN_QUORUM: 5, // 5%
  MAX_QUORUM: 100, // 100%
};

// UI Constants
export const ITEMS_PER_PAGE = 10;

export const MEMBER_ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'member', label: 'Member' },
];

export const PROPOSAL_TYPES = [
  { value: 'treasury_spending', label: 'Treasury Spending' },
  { value: 'member_management', label: 'Member Management' },
  { value: 'governance_change', label: 'Governance Change' },
  { value: 'token_distribution', label: 'Token Distribution' },
  { value: 'general', label: 'General' },
];

export const PROPOSAL_CATEGORIES = [
  { value: 'treasury', label: 'Treasury' },
  { value: 'governance', label: 'Governance' },
  { value: 'membership', label: 'Membership' },
  { value: 'development', label: 'Development' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'operations', label: 'Operations' },
];

// Error messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_TOKENS: 'Insufficient token balance',
  PROPOSAL_NOT_FOUND: 'Proposal not found',
  COMMUNITY_NOT_FOUND: 'Community not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  INVALID_ADDRESS: 'Invalid Stellar address',
  NETWORK_ERROR: 'Network error occurred',
  TRANSACTION_FAILED: 'Transaction failed',
};

// Success messages
export const SUCCESS_MESSAGES = {
  COMMUNITY_CREATED: 'Community created successfully',
  PROPOSAL_CREATED: 'Proposal created successfully',
  VOTE_CAST: 'Vote cast successfully',
  MEMBER_INVITED: 'Member invited successfully',
  SETTINGS_UPDATED: 'Settings updated successfully',
  TOKENS_TRANSFERRED: 'Tokens transferred successfully',
};

// Navigation menu items
export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/create-community', label: 'Create Community' },
  { href: '/profile', label: 'Profile' },
];

// Community sidebar items
export const COMMUNITY_SIDEBAR_ITEMS = [
  { href: '', label: 'Overview', icon: 'Home' },
  { href: '/governance', label: 'Governance', icon: 'Vote' },
  { href: '/members', label: 'Members', icon: 'Users' },
  { href: '/treasury', label: 'Treasury', icon: 'DollarSign' },
]; 