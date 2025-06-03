import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  publicKey: string | null;
  network: 'testnet' | 'mainnet';
  balance: number;
  
  // Actions
  connect: (address: string, publicKey: string) => void;
  disconnect: () => void;
  setBalance: (balance: number) => void;
  setNetwork: (network: 'testnet' | 'mainnet') => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      isConnected: false,
      address: null,
      publicKey: null,
      network: 'testnet',
      balance: 0,

      connect: (address: string, publicKey: string) =>
        set({ isConnected: true, address, publicKey }),

      disconnect: () =>
        set({ 
          isConnected: false, 
          address: null, 
          publicKey: null, 
          balance: 0 
        }),

      setBalance: (balance: number) =>
        set({ balance }),

      setNetwork: (network: 'testnet' | 'mainnet') =>
        set({ network }),
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        isConnected: state.isConnected,
        address: state.address,
        publicKey: state.publicKey,
        network: state.network,
      }),
    }
  )
); 