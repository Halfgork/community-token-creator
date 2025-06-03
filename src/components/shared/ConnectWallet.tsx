'use client';

import { useState, useEffect } from 'react';
import { StellarWalletsKit, WalletNetwork, allowAllModules } from '@creit.tech/stellar-wallets-kit';
import { Wallet, ChevronDown, LogOut, Copy, Check } from 'lucide-react';
import { useWalletStore } from '@/stores/walletStore';
import { truncateAddress } from '@/lib/utils';

let kit: StellarWalletsKit | null = null;

// Initialize kit only on client side
if (typeof window !== 'undefined') {
  try {
    kit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: 'freighter', // Use a default wallet ID
      modules: allowAllModules(),
    });
  } catch (error) {
    console.error('Failed to initialize Stellar Wallets Kit:', error);
  }
}

export function ConnectWallet() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { 
    isConnected, 
    address, 
    balance, 
    connect, 
    disconnect, 
    network
  } = useWalletStore();

  useEffect(() => {
    // Check if wallet was previously connected
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (!kit) return;
    
    try {
      // Try to get address from previously connected wallet
      const response = await kit.getAddress();
      const walletAddress = typeof response === 'string' ? response : response.address;
      if (walletAddress && !isConnected) {
        connect(walletAddress, walletAddress);
        // You could also fetch balance here if needed
        setBalance(100); // Mock balance for now
      }
    } catch (error) {
      console.log('No previous wallet connection found');
    }
  };

  const setBalance = (balance: number) => {
    // You can implement balance fetching logic here
    useWalletStore.getState().setBalance(balance);
  };

  const handleConnect = async () => {
    if (!kit) {
      console.error('Stellar Wallets Kit not initialized');
      return;
    }
    
    setIsConnecting(true);
    try {
      await kit.openModal({
        onWalletSelected: async (option) => {
          try {
            kit?.setWallet(option.id);
            const response = await kit?.getAddress();
            const walletAddress = typeof response === 'string' ? response : response?.address;
            if (walletAddress) {
              connect(walletAddress, walletAddress);
              setBalance(100); // Mock balance - you can implement real balance fetching
              setIsOpen(false);
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

  const handleDisconnect = () => {
    disconnect();
    setIsOpen(false);
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        disabled={isConnecting || !kit}
        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="w-4 h-4" />
        <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center space-x-2"
      >
        <Wallet className="w-4 h-4" />
        <span>{truncateAddress(address || '')}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-secondary-200 py-2 z-50">
          {/* Wallet Info */}
          <div className="px-4 py-3 border-b border-secondary-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-secondary-900">Connected Wallet</span>
              <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-full capitalize">
                {network}
              </span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-secondary-600 font-mono">
                {address}
              </span>
              <button
                onClick={copyAddress}
                className="p-1 hover:bg-secondary-100 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-accent-600" />
                ) : (
                  <Copy className="w-4 h-4 text-secondary-500" />
                )}
              </button>
            </div>
            <div className="text-sm text-secondary-600">
              Balance: {balance.toFixed(4)} XLM
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-secondary-200 px-4 py-2">
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 