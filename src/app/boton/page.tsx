"use client";

import React, { useState } from "react";
import { SorobanRpc, Networks, TransactionBuilder, Operation, xdr } from "@stellar/stellar-sdk";
import { useWallet } from "../WalletProvider"; // Usa el contexto de la wallet

const CONTRACT_ID = "CB6SEZLFXCISCXF2ZBGRGI4LR26F2ABP5ELOPBVXQNLQ4IXFYR7PFCWH";
const NETWORK_PASSPHRASE = Networks.TESTNET;
const RPC_URL = "https://soroban-testnet.stellar.org";

const MintNFTButton = () => {
  const { walletAddress } = useWallet();
  const [loading, setLoading] = useState(false);

  const mintNFT = async () => {
    if (!walletAddress) {
      alert("Conecta tu wallet primero");
      return;
    }

    setLoading(true);
    
    try {
      const server = new SorobanRpc.Server(RPC_URL);

      // 🔹 Obtener la cuenta del usuario
      const account = await server.getAccount(walletAddress);

      // 🔹 Convertir walletAddress a formato correcto
      const addressScVal = xdr.ScVal.scvAddress(
        new xdr.ScAddress.scAddressTypeAccount(
          xdr.PublicKey.publicKeyTypeEd25519(Buffer.from(walletAddress, "hex"))
        )
      );

      // 🔹 Crear transacción para mintear el NFT
      const transaction = new TransactionBuilder(account, {
        fee: "10000",
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(
          Operation.invokeContractFunction({
            contract: CONTRACT_ID,
            function: "mint",
            args: [addressScVal],
          })
        )
        .setTimeout(30)
        .build();

      // 🔹 Firmar con Stellar Wallets Kit
      const signedTx = await kit.signTransaction(transaction);
      
      // 🔹 Enviar la transacción
      const response = await server.sendTransaction(signedTx);

      console.log("NFT Minteado:", response);
      alert("¡NFT Minteado con éxito!");

    } catch (error) {
      console.error("Error al mintear:", error);
      alert("Error al mintear el NFT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={mintNFT}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {loading ? "Minteando..." : "Mintear NFT"}
    </button>
  );
};

export default MintNFTButton;
