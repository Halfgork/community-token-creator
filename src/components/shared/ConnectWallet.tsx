'use client';

import { useEffect, useState } from 'react';
import { useWalletStore } from '@/stores/walletStore';
import { Wallet, Loader2 } from 'lucide-react';
import { StellarWalletsKit, WalletNetwork, allowAllModules } from '@creit.tech/stellar-wallets-kit';

export default function ConnectWallet() {
  const { 
    isConnected, 
    address, 
    connect, 
    disconnect
  } = useWalletStore();
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);

  // Handle hydration mismatch by only showing interactive content after mount
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize kit only on client side
    if (typeof window !== 'undefined') {
      try {
        const walletKit = new StellarWalletsKit({
          network: WalletNetwork.TESTNET,
          selectedWalletId: 'freighter',
          modules: allowAllModules(),
        });
        setKit(walletKit);
      } catch (error) {
        console.error('Failed to initialize Stellar Wallets Kit:', error);
      }
    }
  }, []);

  const handleConnect = async () => {
    if (!kit) {
      console.warn('Stellar Wallets Kit not available');
      return;
    }

    setIsConnecting(true);
    try {
      await kit.openModal({
        onWalletSelected: async (option) => {
          try {
            kit.setWallet(option.id);
            const response = await kit.getAddress();
            const walletAddress = typeof response === 'string' ? response : response?.address;
            if (walletAddress) {
              connect(walletAddress, walletAddress); // Using address as both address and publicKey
            }
          } catch (error) {
            console.error('Failed to get wallet address:', error);
          }
        }
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  // Show loading state during SSR/hydration
  if (!isMounted) {
    return (
      <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3">
        <div className="text-sm">
          <span className="text-secondary-600">Connected:</span>
          <span className="font-mono text-secondary-900 ml-1">
            {address.slice(0, 4)}...{address.slice(-4)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors text-sm"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting || !kit}
      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
} 