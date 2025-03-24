import React, { useState } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
import { Button } from "@/components/ui/button";
import { SorobanRpc, TransactionBuilder, Networks, Operation } from "@stellar/stellar-sdk";

const CONTRACT_ID = "CCNS4SIP6SHHRV2KHIKDWZ7FTFTNOPWZO6BCGGK3WP24TWEUGR2MEYBU"; // Reemplaza con la dirección del contrato

// Inicializar StellarWalletsKit
const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: allowAllModules(),
});

export function MintNFTStellar() {
  const [hash, setHash] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  // Obtener la dirección pública
  const fetchAddress = async () => {
    try {
      const { address } = await kit.getAddress();
      setPublicKey(address);
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!publicKey) {
      console.error("No wallet connected");
      return;
    }

    try {
      const transaction = new TransactionBuilder(publicKey, {
        fee: "100",
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.invokeContractFunction({
            contract: CONTRACT_ID,
            function: "mint",
            args: []
          })
        )
        .setTimeout(30)
        .build();

      // Convertir a XDR y firmar la transacción
      const { signedTxXdr } = await kit.signTransaction(transaction.toXDR(), {
        address: publicKey,
        networkPassphrase: WalletNetwork.TESTNET,
      });

      // Enviar la transacción
      const server = new SorobanRpc.Server("https://horizon-testnet.stellar.org");
      const txResponse = await server.sendTransaction(signedTxXdr);
      setHash(txResponse.hash);
      console.log("Transaction Hash:", txResponse.hash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  return (
    <div className="text-center w-full max-w-md mx-auto">
      {!publicKey ? (
        <Button onClick={fetchAddress}>Connect Wallet</Button>
      ) : (
        <form onSubmit={submit}>
          <Button type="submit">Mint NFT</Button>
        </form>
      )}
      {hash && <p className="mt-4 text-green-500">Tx Hash: {hash}</p>}
    </div>
  );
}
