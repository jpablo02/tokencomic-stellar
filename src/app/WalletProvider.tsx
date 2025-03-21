"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
  ISupportedWallet,
} from "@creit.tech/stellar-wallets-kit";

interface WalletContextType {
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);

  useEffect(() => {
    const initKit = async () => {
      if (typeof window !== "undefined") { // 💡 Solo ejecuta en el navegador
        const storedWallet = localStorage.getItem("stellarWallet");
        setWalletAddress(storedWallet);

        const newKit = new StellarWalletsKit({
          network: WalletNetwork.TESTNET,
          selectedWalletId: XBULL_ID,
          modules: allowAllModules(),
        });
        setKit(newKit);
      }
    };

    initKit();
  }, []);

  const connectWallet = async () => {
    if (!kit) return;

    try {
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          kit.setWallet(option.id);
          const { address } = await kit.getAddress();
          setWalletAddress(address);

          if (typeof window !== "undefined") {
            localStorage.setItem("stellarWallet", address); // Solo en navegador
          }
        },
      });
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("stellarWallet"); // Solo en navegador
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet debe usarse dentro de WalletProvider");
  }
  return context;
};
