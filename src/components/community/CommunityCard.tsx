import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Coins, 
  TrendingUp, 
  Calendar,
  ExternalLink,
  Loader2
} from 'lucide-react';
import CommunityTokenManager from '@/lib/tokenOperations';

interface CommunityCardProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tokenSymbol: string;
  contractId?: string;
  image?: string;
  createdAt: string;
  isOwner?: boolean;
}

export function CommunityCard({
  id,
  name,
  description,
  memberCount,
  tokenSymbol,
  contractId,
  image,
  createdAt,
  isOwner = false
}: CommunityCardProps) {
  const [tokenInfo, setTokenInfo] = useState<{
    totalSupply: string;
    userBalance: string;
    loading: boolean;
  }>({
    totalSupply: '0',
    userBalance: '0',
    loading: true
  });

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!contractId) {
        setTokenInfo(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const tokenManager = new CommunityTokenManager(contractId);
        
        // Fetch token info and user balance
        const [infoResult, balanceResult] = await Promise.all([
          tokenManager.getTokenInfo(),
          tokenManager.getTokenBalance('user_address_placeholder') // Would use actual user address
        ]);

        if (infoResult.success && balanceResult.success) {
          setTokenInfo({
            totalSupply: infoResult.data?.totalSupply || '0',
            userBalance: balanceResult.data?.balance || '0',
            loading: false
          });
        }
      } catch (error) {
        console.error('Error fetching token info:', error);
        setTokenInfo(prev => ({ ...prev, loading: false }));
      }
    };

    fetchTokenInfo();
  }, [contractId]);

  const formatTokenAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (num === 0) return '0';
    if (num < 1) return num.toFixed(4);
    if (num < 1000) return num.toFixed(2);
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
    return `${(num / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="bg-white rounded-xl border border-secondary-200 hover:border-primary-300 transition-all duration-200 overflow-hidden hover:shadow-lg">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-secondary-900 text-lg">{name}</h3>
              <div className="flex items-center space-x-1 text-sm text-secondary-500">
                <Coins className="w-4 h-4" />
                <span>{tokenSymbol}</span>
                {isOwner && (
                  <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded text-xs font-medium ml-2">
                    Owner
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <Link
            href={`/community/${id}`}
            className="text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>

        <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-secondary-500 mb-1">
              <Users className="w-4 h-4" />
            </div>
            <div className="font-semibold text-secondary-900">{memberCount}</div>
            <div className="text-xs text-secondary-500">Members</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-secondary-500 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            {tokenInfo.loading ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              <div className="font-semibold text-secondary-900">
                {formatTokenAmount(tokenInfo.totalSupply)}
              </div>
            )}
            <div className="text-xs text-secondary-500">Total Supply</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-secondary-500 mb-1">
              <Coins className="w-4 h-4" />
            </div>
            {tokenInfo.loading ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              <div className="font-semibold text-secondary-900">
                {formatTokenAmount(tokenInfo.userBalance)}
              </div>
            )}
            <div className="text-xs text-secondary-500">Your Balance</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-secondary-500">
            <Calendar className="w-3 h-3" />
            <span>Created {new Date(createdAt).toLocaleDateString()}</span>
          </div>
          
          {contractId && (
            <div className="text-xs text-secondary-500 font-mono">
              Contract: {contractId.slice(0, 8)}...{contractId.slice(-6)}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-3 bg-gradient-to-r from-primary-50 to-accent-50 border-t border-secondary-100">
        <div className="flex items-center justify-between">
          <Link
            href={`/community/${id}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            View Community
          </Link>
          
          <div className="flex items-center space-x-3">
            <Link
              href={`/community/${id}/governance`}
              className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
            >
              Governance
            </Link>
            <Link
              href={`/community/${id}/treasury`}
              className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
            >
              Treasury
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityCard; 