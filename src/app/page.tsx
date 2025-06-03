'use client';

import Link from "next/link";
import { 
  ArrowRight, 
  Users, 
  Vote, 
  Coins, 
  Shield, 
  BarChart3, 
  Zap,
  CheckCircle,
  Plus
} from "lucide-react";
import ConnectWallet from "@/components/shared/ConnectWallet";
import { useWalletStore } from "@/stores/walletStore";

export default function HomePage() {
  const { isConnected } = useWalletStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-secondary-900">Community Token Creator</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-secondary-600 hover:text-primary-600 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-secondary-600 hover:text-primary-600 transition-colors">
                How it Works
              </Link>
              <Link href="#pricing" className="text-secondary-600 hover:text-primary-600 transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              {isConnected && (
                <Link
                  href="/dashboard"
                  className="text-secondary-600 hover:text-primary-600 transition-colors font-medium hidden sm:block"
                >
                  Dashboard
                </Link>
              )}
              <ConnectWallet />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6">
            Build Powerful
            <span className="block text-primary-600">Token Communities</span>
          </h1>
          <p className="text-xl text-secondary-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Create, manage, and govern decentralized communities with custom tokens, 
            governance systems, and treasury management on the Stellar blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/create-community"
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-5 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-bold text-xl flex items-center justify-center shadow-xl transform hover:scale-105 border-2 border-primary-600"
            >
              <Plus className="mr-3 w-6 h-6" />
              Create Your Community
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            {isConnected ? (
              <Link
                href="/dashboard"
                className="border-2 border-primary-600 text-primary-600 px-10 py-5 rounded-xl hover:bg-primary-50 transition-colors font-semibold text-xl"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="border-2 border-secondary-300 text-secondary-400 px-10 py-5 rounded-xl font-semibold text-xl cursor-not-allowed">
                Connect Wallet for Dashboard
              </div>
            )}
          </div>
          
          {/* Additional prominent CTA */}
          <div className="mt-16 bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 text-left">
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  Ready to Start Building?
                </h3>
                <p className="text-secondary-600 text-lg">
                  Launch your token community in minutes with our easy setup wizard.
                </p>
              </div>
              <Link
                href="/create-community"
                className="bg-accent-600 text-white px-8 py-4 rounded-xl hover:bg-accent-700 transition-colors font-semibold flex items-center space-x-2 shadow-lg transform hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Everything You Need for Community Success
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Comprehensive tools to build, manage, and scale your token-powered community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-secondary-200 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Custom Token Creation</h3>
              <p className="text-secondary-600">
                Deploy your own community token with customizable supply, distribution, and utility features.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-secondary-200 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <Vote className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Governance System</h3>
              <p className="text-secondary-600">
                Enable democratic decision-making with proposal creation, voting mechanisms, and execution.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-secondary-200 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Member Management</h3>
              <p className="text-secondary-600">
                Organize members with roles, permissions, and token-based access controls.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-secondary-200 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Treasury Analytics</h3>
              <p className="text-secondary-600">
                Track community funds, token distribution, and financial metrics with detailed analytics.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-secondary-200 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Security First</h3>
              <p className="text-secondary-600">
                Built on Stellar blockchain with admin controls, freeze mechanisms, and secure smart contracts.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-secondary-200 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Easy Integration</h3>
              <p className="text-secondary-600">
                Simple setup process with intuitive interfaces and comprehensive documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Get your community up and running in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Create Your Community</h3>
              <p className="text-secondary-600">
                Set up your community with custom branding, token parameters, and governance rules.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Invite Members</h3>
              <p className="text-secondary-600">
                Add members to your community and distribute tokens based on your allocation strategy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Start Governing</h3>
              <p className="text-secondary-600">
                Begin creating proposals, voting on decisions, and managing your community treasury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-secondary-900 mb-6">
                Why Choose Community Token Creator?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Proven Technology</h3>
                    <p className="text-secondary-600">Built on Stellar blockchain for fast, secure, and low-cost transactions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">User-Friendly Design</h3>
                    <p className="text-secondary-600">Intuitive interface designed for both technical and non-technical users.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Comprehensive Features</h3>
                    <p className="text-secondary-600">All the tools you need for community management in one platform.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Scalable Solutions</h3>
                    <p className="text-secondary-600">Grow from small groups to large communities with our flexible architecture.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                  <div className="text-secondary-600">Communities Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
                  <div className="text-secondary-600">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">$2M+</div>
                  <div className="text-secondary-600">Treasury Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
                  <div className="text-secondary-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Community?
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Join thousands of communities already using our platform to govern and grow together.
          </p>
          <Link
            href="/create-community"
            className="bg-white text-primary-600 px-10 py-5 rounded-xl hover:bg-primary-50 transition-colors font-bold text-xl inline-flex items-center shadow-xl transform hover:scale-105"
          >
            <Plus className="mr-3 w-6 h-6" />
            Start Building Today
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Community Token Creator</span>
              </div>
              <p className="text-secondary-400">
                Empowering communities through decentralized governance and token-based coordination.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/create-community" className="hover:text-white transition-colors">Create Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400">
            <p>&copy; 2024 Community Token Creator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
