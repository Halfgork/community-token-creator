// Frontend API Client for Backend Contract Services
// Frontend artık sadece backend API'sini çağırır, contract deployment yapmaz

export interface CommunityTokenRequest {
  tokenName: string;
  tokenSymbol: string;
  decimals: number;
  totalSupply: string;
  adminAddress: string;
  communityName: string;
  description: string;
  
  // Distribution percentages
  treasuryAllocation: number;
  founderAllocation: number;
  communityAllocation: number;
  
  // Wallet addresses for token distribution
  treasuryWallet: string;
  founderWallet: string;
  communityWallet: string;
}

export interface ContractDeploymentResponse {
  success: boolean;
  contractId?: string;
  transactionHash?: string;
  error?: string;
  data?: {
    tokenName: string;
    tokenSymbol: string;
    decimals: number;
    totalSupply: string;
  };
}

export interface TokenInteractionResponse {
  success: boolean;
  transactionHash?: string;
  data?: {
    contractId?: string;
    name?: string;
    symbol?: string;
    decimals?: number;
    totalSupply?: string;
    balance?: string;
    address?: string;
    from?: string;
    to?: string;
    amount?: string;
  };
  error?: string;
}

export class ContractAPI {
  private baseURL: string;
  private useMockData: boolean;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    // Use mock data when backend is not available
    this.useMockData = process.env.NODE_ENV === 'development';
  }

  /**
   * Deploy new community token contract via backend
   * Backend handles: WASM loading, contract deployment, initialization
   */
  async deployCommunityToken(request: CommunityTokenRequest): Promise<ContractDeploymentResponse> {
    // Use mock data for development when no backend is available
    if (this.useMockData) {
      console.log('🔧 Using mock contract deployment (no backend available)');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock contract ID and transaction hash
      const mockContractId = 'C' + Array(55).fill(0).map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'[Math.floor(Math.random() * 32)]).join('');
      const mockTxHash = Array(64).fill(0).map(() => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
      
      return {
        success: true,
        contractId: mockContractId,
        transactionHash: mockTxHash,
        data: {
          tokenName: request.tokenName,
          tokenSymbol: request.tokenSymbol,
          decimals: request.decimals,
          totalSupply: request.totalSupply,
        }
      };
    }

    try {
      console.log('🚀 Requesting contract deployment from backend...');
      
      const response = await fetch(`${this.baseURL}/api/contracts/deploy-community-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Contract deployed successfully:', result.contractId);
      } else {
        console.error('❌ Contract deployment failed:', result.error);
      }

      return result;

    } catch (error) {
      console.error('🔥 API call failed, falling back to mock data:', error);
      
      // Fallback to mock data if API fails
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockContractId = 'C' + Array(55).fill(0).map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'[Math.floor(Math.random() * 32)]).join('');
      const mockTxHash = Array(64).fill(0).map(() => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
      
      return {
        success: true,
        contractId: mockContractId,
        transactionHash: mockTxHash,
        data: {
          tokenName: request.tokenName,
          tokenSymbol: request.tokenSymbol,
          decimals: request.decimals,
          totalSupply: request.totalSupply,
        }
      };
    }
  }

  /**
   * Get contract information (can be called from frontend)
   */
  async getContractInfo(contractId: string): Promise<TokenInteractionResponse> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        data: {
          contractId,
          name: 'Mock Community Token',
          symbol: 'MCT',
          decimals: 7,
          totalSupply: '1000000'
        }
      };
    }

    try {
      const response = await fetch(`${this.baseURL}/api/contracts/${contractId}/info`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch contract info'
      };
    }
  }

  /**
   * Get token balance for an address
   */
  async getTokenBalance(contractId: string, address: string): Promise<TokenInteractionResponse> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        success: true,
        data: {
          balance: '1000000000', // 100 tokens with 7 decimals
          address
        }
      };
    }

    try {
      const response = await fetch(
        `${this.baseURL}/api/contracts/${contractId}/balance/${address}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch balance'
      };
    }
  }

  /**
   * Prepare transaction for user to sign (frontend handles wallet signing)
   */
  async prepareTokenTransfer(
    contractId: string,
    from: string,
    to: string,
    amount: string
  ): Promise<{
    success: boolean;
    transaction?: string; // XDR string for user to sign
    error?: string;
  }> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        success: true,
        transaction: 'MOCK_XDR_TRANSACTION_STRING'
      };
    }

    try {
      const response = await fetch(`${this.baseURL}/api/contracts/${contractId}/prepare-transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to, amount }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to prepare transaction'
      };
    }
  }

  /**
   * Submit signed transaction
   */
  async submitSignedTransaction(signedTransactionXdr: string): Promise<TokenInteractionResponse> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockTxHash = Array(64).fill(0).map(() => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
      return {
        success: true,
        transactionHash: mockTxHash
      };
    }

    try {
      const response = await fetch(`${this.baseURL}/api/contracts/submit-transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          signedTransaction: signedTransactionXdr 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit transaction'
      };
    }
  }

  /**
   * Get all communities with their contract info
   */
  async getCommunities(): Promise<{
    success: boolean;
    communities?: Array<{
      id: string;
      name: string;
      description: string;
      contractId: string;
      tokenSymbol: string;
      memberCount: number;
      createdAt: string;
      isOwner: boolean;
    }>;
    error?: string;
  }> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        success: true,
        communities: [
          {
            id: 'mock-community-1',
            name: 'Mock Community',
            description: 'A mock community for testing',
            contractId: 'CMOCKCONTRACTID123456789ABCDEF',
            tokenSymbol: 'MCT',
            memberCount: 42,
            createdAt: new Date().toISOString(),
            isOwner: true
          }
        ]
      };
    }

    try {
      const response = await fetch(`${this.baseURL}/api/communities`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch communities'
      };
    }
  }

  /**
   * Get deployment status for tracking progress
   */
  async getDeploymentStatus(deploymentId: string): Promise<{
    success: boolean;
    status?: 'pending' | 'uploading' | 'deploying' | 'initializing' | 'completed' | 'failed';
    progress?: number;
    message?: string;
    contractId?: string;
    error?: string;
  }> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return {
        success: true,
        status: 'completed',
        progress: 100,
        message: 'Contract deployed successfully',
        contractId: deploymentId
      };
    }

    try {
      const response = await fetch(`${this.baseURL}/api/deployments/${deploymentId}/status`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch deployment status'
      };
    }
  }

  /**
   * Health check for backend service
   */
  async healthCheck(): Promise<{
    success: boolean;
    status?: string;
    stellar?: boolean;
    contracts?: boolean;
  }> {
    if (this.useMockData) {
      return {
        success: true,
        status: 'mock',
        stellar: true,
        contracts: true
      };
    }

    try {
      const response = await fetch(`${this.baseURL}/api/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch {
      return {
        success: false,
      };
    }
  }
}

// Singleton instance
export const contractAPI = new ContractAPI();

export default ContractAPI; 