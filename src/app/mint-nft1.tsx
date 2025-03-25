import React, { useState } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
import { Button } from "@/components/ui/button";
import {
  SorobanRpc,
  TransactionBuilder,
  Networks,
  Operation,
  Transaction,
  Address,
  xdr,
} from "@stellar/stellar-sdk";

const CONTRACT_ID = "CCNS4SIP6SHHRV2KHIKDWZ7FTFTNOPWZO6BCGGK3WP24TWEUGR2MEYBU";
const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org/");
const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: allowAllModules(),
});

export function MintNFTStellar() {
  const [hash, setHash] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async () => {
    try {
      setError(null);
      const { address } = await kit.getAddress();
      console.log("Wallet connected:", address);
      setPublicKey(address);
    } catch (err) {
      setError("Error getting address");
      console.error("Error getting address:", err);
    }
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!publicKey) {
      setError("No wallet connected");
      console.error("No wallet connected");
      return;
    }

    setLoading(true);
    setError(null);
    setHash(null);
    setStatus(null);

    try {
      console.log("Fetching account:", publicKey);
      const account = await server.getAccount(publicKey);

      console.log("Building transaction...");
      const userAddressScVal = xdr.ScVal.scvAddress(
        new Address(publicKey).toScAddress()
      );

      const transaction = new TransactionBuilder(account, {
        fee: "100",
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.invokeContractFunction({
            contract: CONTRACT_ID,
            function: "mint",
            args: [userAddressScVal],
          })
        )
        .setTimeout(30)
        .build();

      console.log("Transaction XDR before signing:", transaction.toXDR());

      console.log("Signing transaction...");
      const { signedTxXdr } = await kit.signTransaction(transaction.toXDR(), {
        address: publicKey,
        networkPassphrase: WalletNetwork.TESTNET,
      });

      if (!signedTxXdr) {
        throw new Error("Transaction signing failed");
      }

      console.log("Transaction signed successfully. Sending transaction...");

      // Enviar transacción a la red
      const txResponse = await server.sendTransaction(
        new Transaction(signedTxXdr, Networks.TESTNET)
      );

      console.log("Transaction response:", txResponse);

      

      setHash(txResponse.hash);
      console.log("Transaction Hash:", txResponse.hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction failed");
      console.error("Transaction failed:", err);
    } finally {
      setLoading(false);
    }
  }

  const checkTransactionStatus = async () => {
    if (!hash) {
      setError("No transaction hash found");
      console.error("No transaction hash found");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      console.log("Checking transaction status for hash:", hash);
      const response = await server.getTransaction(hash);
      setStatus(response.status);
      console.log("Transaction Status:", response.status);
    } catch (err) {
      setError("Error checking transaction status");
      console.error("Error checking transaction status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center w-full max-w-md mx-auto">
      {error && <p className="text-red-500">{error}</p>}
      {!publicKey ? (
        <Button onClick={fetchAddress} disabled={loading}>
          {loading ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <form onSubmit={submit}>
          <Button type="submit" disabled={loading}>
            {loading ? "Minting..." : "Mint NFT"}
          </Button>
        </form>
      )}
      {hash && (
        <>
          <p className="mt-4 text-green-500">Tx Hash: {hash}</p>
          <Button onClick={checkTransactionStatus} className="mt-2" disabled={loading}>
            {loading ? "Checking..." : "Check Transaction Status"}
          </Button>
          {status && <p className="mt-2 text-blue-500">Status: {status}</p>}
        </>
      )}
    </div>
  );
}
