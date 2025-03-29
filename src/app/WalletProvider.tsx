"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
  FREIGHTER_ID,
  ISupportedWallet,
} from "@creit.tech/stellar-wallets-kit";

interface WalletContextType {
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  selectedWallet: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);

  useEffect(() => {
    const initKit = async () => {
      if (typeof window !== "undefined") { // Solo ejecuta en navegador
        const storedWallet = localStorage.getItem("stellarWallet");
        const storedWalletId = localStorage.getItem("selectedWallet");

        setWalletAddress(storedWallet);
        setSelectedWallet(storedWalletId);

        const newKit = new StellarWalletsKit({
          network: WalletNetwork.TESTNET,
          selectedWalletId: storedWalletId || XBULL_ID, // Usa la última wallet conectada
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
          setSelectedWallet(option.id);

          if (typeof window !== "undefined") {
            localStorage.setItem("stellarWallet", address);
            localStorage.setItem("selectedWallet", option.id); // Guarda la wallet seleccionada
          }
        },
      });
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setSelectedWallet(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("stellarWallet");
      localStorage.removeItem("selectedWallet");
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet, selectedWallet }}>
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
