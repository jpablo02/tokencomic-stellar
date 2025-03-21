"use client";

import React, { useState, useEffect } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
  ISupportedWallet,
} from "@creit.tech/stellar-wallets-kit";

export const ConnectButtons = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      setIsInitializing(true);
      try {
        const newKit = new StellarWalletsKit({
          network: WalletNetwork.TESTNET,
          selectedWalletId: XBULL_ID,
          modules: allowAllModules(),
        });
        setKit(newKit);
      } catch (error) {
        console.error("Error al inicializar el kit:", error);
        setError("Error al inicializar el kit");
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  const connectWallet = async () => {
    if (!kit) {
      setError("El kit no está inicializado");
      return;
    }

    try {
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          kit.setWallet(option.id);
          const { address } = await kit.getAddress();
          setWalletAddress(address);
          setError(null);
        },
        onClosed: (err) => {
          if (err) setError("Error al cerrar el modal");
        },
        modalTitle: "Selecciona tu wallet",
      });
    } catch (error) {
      console.error("Error al abrir el modal:", error);
      setError("Error al conectar la wallet");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setError(null);
  };

  return (
    <div className="relative flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg shadow-md text-white">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {walletAddress ? (
        <>
          <p className="text-green-400">Conectado: {walletAddress}</p>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-lg"
          >
            Desconectar
          </button>
        </>
      ) : (
        <>
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg"
            disabled={isInitializing}
          >
            {isInitializing ? "Inicializando..." : "Conectar Wallet"}
          </button>
        </>
      )}
    </div>
  );
};
