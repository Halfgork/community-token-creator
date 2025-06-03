'use client';

import Link from "next/link";
import { 
  Plus, 
  Users, 
  Vote, 
  DollarSign, 
  TrendingUp,
  Calendar,
  BarChart3,
  Settings,
  Coins,
  Wallet,
  ArrowRight
} from "lucide-react";
import { ConnectWallet } from "@/components/shared/ConnectWallet";
import { useWalletStore } from "@/stores/walletStore";

// Mock data for demonstration
const mockCommunities = [
  {
    id: '1',
    name: 'DeFi Builders',
    tokenSymbol: 'DEFI',
    memberCount: 156,
    treasuryBalance: 45000,
    activeProposals: 3,
    image: null,
  },
  {
    id: '2',
    name: 'NFT Creators Hub',
    tokenSymbol: 'NFT',
    memberCount: 89,
    treasuryBalance: 12500,
    activeProposals: 1,
    image: null,
  },
  {
    id: '3',
    name: 'Web3 Innovators',
    tokenSymbol: 'WEB3',
    memberCount: 234,
    treasuryBalance: 78000,
    activeProposals: 5,
    image: null,
  },
];

const recentActivity = [
  {
    id: '1',
    type: 'proposal',
    description: 'New treasury allocation proposal in DeFi Builders',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'member',
    description: '15 new members joined NFT Creators Hub',
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    type: 'vote',
    description: 'Governance proposal passed in Web3 Innovators',
    timestamp: '1 day ago',
  },
];

// Wallet connection required component
function WalletRequired() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-10 h-10 text-primary-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">
            Connect Your Wallet
          </h1>
          
          <p className="text-secondary-600 mb-8">
            You need to connect your Stellar wallet to access your dashboard and manage your communities.
          </p>
          
          <div className="space-y-4">
            <ConnectWallet />
            
            <div className="text-center">
              <Link
                href="/"
                className="text-secondary-500 hover:text-primary-600 transition-colors text-sm"
              >
                ← Back to Homepage
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-secondary-200">
            <p className="text-secondary-500 text-sm mb-4">
              Don't have a wallet yet?
            </p>
            <div className="space-y-2">
              <a
                href="https://www.freighter.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Download Freighter Wallet
              </a>
              <a
                href="https://albedo.link/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Try Albedo Web Wallet
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isConnected } = useWalletStore();

  // If wallet is not connected, show the wallet required screen
  if (!isConnected) {
    return <WalletRequired />;
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-secondary-900">Community Token Creator</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-secondary-600 hover:text-primary-600 transition-colors font-medium hidden sm:block"
              >
                Profile
              </Link>
              <Link
                href="/create-community"
                className="bg-gradient-to-r from-accent-600 to-accent-700 text-white px-8 py-4 rounded-xl hover:from-accent-700 hover:to-accent-800 transition-all duration-200 font-bold flex items-center space-x-2 shadow-lg transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>Create Community</span>
              </Link>
              <ConnectWallet />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Welcome back!</h1>
          <p className="text-secondary-600">Manage your communities and track their progress</p>
        </div>

        {/* Create Community CTA Banner */}
        <div className="bg-gradient-to-r from-accent-600 to-primary-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-3">Ready to create your community?</h2>
              <p className="text-accent-100 text-lg">
                Set up your token, governance, and start building together in minutes.
              </p>
            </div>
            <Link
              href="/create-community"
              className="bg-white text-accent-600 px-10 py-5 rounded-xl hover:bg-accent-50 transition-all duration-200 font-bold text-lg flex items-center space-x-3 shadow-lg transform hover:scale-105"
            >
              <Plus className="w-6 h-6" />
              <span>Create New Community</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-600 text-sm font-medium">Total Communities</p>
                <p className="text-2xl font-bold text-secondary-900">{mockCommunities.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-600 text-sm font-medium">Total Members</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {mockCommunities.reduce((acc, comm) => acc + comm.memberCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-600 text-sm font-medium">Active Proposals</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {mockCommunities.reduce((acc, comm) => acc + comm.activeProposals, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Vote className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-600 text-sm font-medium">Total Treasury</p>
                <p className="text-2xl font-bold text-secondary-900">
                  ${mockCommunities.reduce((acc, comm) => acc + comm.treasuryBalance, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Communities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-secondary-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">Your Communities</h2>
                <Link
                  href="/create-community"
                  className="bg-accent-600 text-white px-6 py-3 rounded-lg hover:bg-accent-700 transition-colors font-semibold flex items-center space-x-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New</span>
                </Link>
              </div>
              
              {mockCommunities.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">No communities yet</h3>
                  <p className="text-secondary-600 mb-8 max-w-sm mx-auto">
                    Create your first community to start building and governing together.
                  </p>
                  <Link
                    href="/create-community"
                    className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-colors font-semibold inline-flex items-center space-x-2 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create Your First Community</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockCommunities.map((community) => (
                    <Link
                      key={community.id}
                      href={`/community/${community.id}`}
                      className="block p-4 border border-secondary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">
                              {community.tokenSymbol.slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-secondary-900">{community.name}</h3>
                            <p className="text-secondary-600 text-sm">
                              {community.memberCount} members • ${community.treasuryBalance.toLocaleString()} treasury
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-primary-600 font-semibold">{community.tokenSymbol}</p>
                          <p className="text-secondary-500 text-sm">
                            {community.activeProposals} active proposals
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-secondary-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.type === 'proposal' && <Vote className="w-4 h-4 text-secondary-600" />}
                      {activity.type === 'member' && <Users className="w-4 h-4 text-secondary-600" />}
                      {activity.type === 'vote' && <BarChart3 className="w-4 h-4 text-secondary-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-secondary-900 text-sm">{activity.description}</p>
                      <p className="text-secondary-500 text-xs mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-secondary-200 p-6 mt-6 shadow-sm">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <Link
                  href="/create-community"
                  className="flex items-center space-x-3 p-4 rounded-xl hover:bg-accent-50 transition-colors border-2 border-accent-200 hover:border-accent-300"
                >
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-accent-600" />
                  </div>
                  <div className="flex-1">
                    <span className="text-secondary-900 font-semibold block">Create Community</span>
                    <span className="text-secondary-600 text-sm">Launch your token community</span>
                  </div>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 p-4 rounded-xl hover:bg-secondary-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div className="flex-1">
                    <span className="text-secondary-900 font-semibold block">Account Settings</span>
                    <span className="text-secondary-600 text-sm">Manage your preferences</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 