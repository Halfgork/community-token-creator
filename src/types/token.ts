export interface Token {
  contractAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  totalSupply: number;
  adminAddress: string;
  communityId: string;
  createdAt: Date;
}

export interface TokenBalance {
  walletAddress: string;
  balance: number;
  tokenAddress: string;
  lastUpdated: Date;
}

export interface TokenTransaction {
  id: string;
  type: TokenTransactionType;
  from: string;
  to: string;
  amount: number;
  tokenAddress: string;
  transactionHash: string;
  timestamp: Date;
  status: TransactionStatus;
}

export enum TokenTransactionType {
  MINT = 'mint',
  TRANSFER = 'transfer',
  BURN = 'burn',
  FREEZE = 'freeze',
  UNFREEZE = 'unfreeze'
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed'
}

export interface TokenOperations {
  mint: (to: string, amount: number) => Promise<string>;
  transfer: (from: string, to: string, amount: number) => Promise<string>;
  burn: (from: string, amount: number) => Promise<string>;
  freeze: (account: string) => Promise<string>;
  unfreeze: (account: string) => Promise<string>;
  getBalance: (account: string) => Promise<number>;
  getTotalSupply: () => Promise<number>;
  getAdmin: () => Promise<string>;
  setAdmin: (newAdmin: string) => Promise<string>;
}

export interface TokenDistribution {
  totalSupply: number;
  treasuryAllocation: number;
  founderAllocation: number;
  communityAllocation: number;
  distributedAmount: number;
  remainingAmount: number;
} 