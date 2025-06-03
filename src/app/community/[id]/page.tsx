'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Users,
  Coins,
  Settings,
  TrendingUp,
  Wallet,
  Vote,
  Activity,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useWalletStore } from '@/stores/walletStore';
import { contractAPI } from '@/lib/contractAPI';

interface CommunityData {
  id: string;
  name: string;
  description: string;
  contractId: string;
  tokenSymbol: string;
  tokenName: string;
  totalSupply: string;
  memberCount: number;
  createdAt: string;
  isOwner: boolean;
  adminAddress: string;
  governance: {
    votingPeriod: number;
    quorumPercentage: number;
    proposalThreshold: number;
  };
  distribution: {
    treasury: number;
    founder: number;
    community: number;
  };
}

export default function CommunityPage() {
  const params = useParams();
  const contractId = params.id as string;
  const { address: walletAddress, isConnected } = useWalletStore();
  
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadCommunityData = async () => {
      try {
        setLoading(true);
        
        // First try to get community data from localStorage
        const savedCommunityData = localStorage.getItem(`community_${contractId}`);
        if (savedCommunityData) {
          const parsedData = JSON.parse(savedCommunityData);
          setCommunity(parsedData);
          
          // Get user's token balance if connected
          if (isConnected && walletAddress) {
            const balanceResult = await contractAPI.getTokenBalance(contractId, walletAddress);
            if (balanceResult.success && balanceResult.data?.balance) {
              setBalance(balanceResult.data.balance);
            }
          }
          return;
        }
        
        // Fallback: Get contract info and create mock data
        const contractInfo = await contractAPI.getContractInfo(contractId);
        
        if (!contractInfo.success) {
          throw new Error(contractInfo.error || 'Failed to load community');
        }

        // Mock community data (would come from backend/database)
        const mockCommunity: CommunityData = {
          id: contractId,
          name: 'DeFi Community',
          description: 'A decentralized finance community building the future of money',
          contractId,
          tokenSymbol: contractInfo.data?.symbol || 'DEFI',
          tokenName: contractInfo.data?.name || 'DeFi Token',
          totalSupply: contractInfo.data?.totalSupply || '1000000',
          memberCount: 156,
          createdAt: new Date().toISOString(),
          isOwner: true,
          adminAddress: walletAddress || '',
          governance: {
            votingPeriod: 7,
            quorumPercentage: 20,
            proposalThreshold: 1000,
          },
          distribution: {
            treasury: 50,
            founder: 20,
            community: 30,
          }
        };

        setCommunity(mockCommunity);

        // Get user's token balance if connected
        if (isConnected && walletAddress) {
          const balanceResult = await contractAPI.getTokenBalance(contractId, walletAddress);
          if (balanceResult.success && balanceResult.data?.balance) {
            setBalance(balanceResult.data.balance);
          }
        }

      } catch (err) {
        console.error('Error loading community:', err);
        setError(err instanceof Error ? err.message : 'Failed to load community');
      } finally {
        setLoading(false);
      }
    };

    if (contractId) {
      loadCommunityData();
    }
  }, [contractId, walletAddress, isConnected]);

  const copyContractId = () => {
    navigator.clipboard.writeText(contractId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTokenAmount = (amount: string, decimals: number = 7) => {
    const num = parseInt(amount) / Math.pow(10, decimals);
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading community...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">Community Not Found</h1>
          <p className="text-secondary-600 mb-6">{error}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!community) return null;

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <Link 
              href="/dashboard"
              className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Header */}
        <div className="bg-white rounded-xl border border-secondary-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">{community.name}</h1>
              <p className="text-secondary-600 mb-4">{community.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-secondary-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{community.memberCount} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="w-4 h-4" />
                  <span>Created {new Date(community.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-secondary-600 mb-2">
                <span>Contract ID:</span>
                <button
                  onClick={copyContractId}
                  className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
                >
                  <span className="font-mono">{contractId.slice(0, 8)}...{contractId.slice(-8)}</span>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {community.isOwner && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                  Owner
                </span>
              )}
            </div>
          </div>

          {/* Token Info */}
          <div className="grid md:grid-cols-3 gap-6 p-6 bg-secondary-50 rounded-lg">
            <div>
              <h3 className="font-medium text-secondary-900 mb-2">Token Information</h3>
              <div className="space-y-1 text-sm">
                <div><span className="text-secondary-600">Name:</span> {community.tokenName}</div>
                <div><span className="text-secondary-600">Symbol:</span> {community.tokenSymbol}</div>
                <div><span className="text-secondary-600">Total Supply:</span> {formatTokenAmount(community.totalSupply)}</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-secondary-900 mb-2">Your Balance</h3>
              <div className="text-2xl font-bold text-primary-600">
                {isConnected ? formatTokenAmount(balance) : '---'}
                <span className="text-sm font-normal text-secondary-500 ml-1">{community.tokenSymbol}</span>
              </div>
              {!isConnected && (
                <p className="text-sm text-secondary-500">Connect wallet to see balance</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-secondary-900 mb-2">Distribution</h3>
              <div className="space-y-1 text-sm">
                <div><span className="text-secondary-600">Treasury:</span> {community.distribution.treasury}%</div>
                <div><span className="text-secondary-600">Founder:</span> {community.distribution.founder}%</div>
                <div><span className="text-secondary-600">Community:</span> {community.distribution.community}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Members */}
          <Link
            href={`/community/${contractId}/members`}
            className="bg-white rounded-xl border border-secondary-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-1">Members</h3>
                <p className="text-secondary-600 text-sm">Manage community members and roles</p>
              </div>
            </div>
          </Link>

          {/* Treasury */}
          <Link
            href={`/community/${contractId}/treasury`}
            className="bg-white rounded-xl border border-secondary-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                <Wallet className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-1">Treasury</h3>
                <p className="text-secondary-600 text-sm">View treasury funds and transactions</p>
              </div>
            </div>
          </Link>

          {/* Governance */}
          <Link
            href={`/community/${contractId}/governance`}
            className="bg-white rounded-xl border border-secondary-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Vote className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-1">Governance</h3>
                <p className="text-secondary-600 text-sm">Proposals and voting system</p>
              </div>
            </div>
          </Link>

          {/* Token Operations */}
          <div className="bg-white rounded-xl border border-secondary-200 p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-1">Token Operations</h3>
                <p className="text-secondary-600 text-sm">Transfer, mint, and manage tokens</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Transfer Tokens
              </button>
              {community.isOwner && (
                <button className="w-full px-4 py-2 text-sm border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors">
                  Mint Tokens
                </button>
              )}
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-xl border border-secondary-200 p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-1">Analytics</h3>
                <p className="text-secondary-600 text-sm">Community metrics and insights</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-600">Active Members:</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Token Holders:</span>
                <span className="font-medium">124</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Proposals:</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          {community.isOwner && (
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">Settings</h3>
                  <p className="text-secondary-600 text-sm">Configure community settings</p>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 text-sm border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors">
                Manage Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 