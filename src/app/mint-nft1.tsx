import React, { useState, useEffect } from "react";
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
  scValToNative,
  TimeoutInfinite,
} from "@stellar/stellar-sdk";

const CONTRACT_ID = "CB6SEZLFXCISCXF2ZBGRGI4LR26F2ABP5ELOPBVXQNLQ4IXFYR7PFCWH";
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
  const [tokenId, setTokenId] = useState<string>(""); // Estado para el tokenId

  const fetchAddress = async () => {
    try {
      setError(null);
      const { address } = await kit.getAddress();
      setPublicKey(address);
    } catch (err) {
      setError("Error connecting wallet");
      console.error("Error getting address:", err);
    }
  };

  const handleMint = async () => {
    if (!publicKey) {
      setError("Wallet not connected");
      return;
    }

    if (!tokenId || isNaN(Number(tokenId))) {
      setError("Invalid token ID");
      return;
    }

    setLoading(true);
    setError(null);
    setHash(null);
    setStatus(null);

    try {
      const account = await server.getAccount(publicKey);
      const networkPassphrase = Networks.TESTNET;
      const mintArgs = [
        xdr.ScVal.scvAddress(Address.fromString(publicKey).toScAddress()),
        xdr.ScVal.scvI128(
          new xdr.Int128Parts({
            hi: new xdr.Int64(0), // ✅ Se requiere Int64 para 'hi'
            lo: new xdr.Uint64(BigInt(tokenId)), // ✅ Se requiere Uint64 para 'lo'
          })
        ),
      ];
      
      

      let transaction = new TransactionBuilder(account, {
        fee: "1000000",
        networkPassphrase,
      })
        .addOperation(
          Operation.invokeContractFunction({
            contract: CONTRACT_ID,
            function: "mint",
            args: mintArgs,
          })
        )
        .setTimeout(TimeoutInfinite)
        .build();

      const simulateResult = await server.simulateTransaction(transaction);
      if ("error" in simulateResult) {
        throw new Error(`Simulation failed: ${simulateResult.error}`);
      }

      const preparedTx = SorobanRpc.assembleTransaction(transaction, simulateResult).build();
      const { signedTxXdr } = await kit.signTransaction(preparedTx.toXDR(), {
        address: publicKey,
        networkPassphrase,
      });

      if (!signedTxXdr) throw new Error("Signing failed");

      const tx = TransactionBuilder.fromXDR(signedTxXdr, networkPassphrase);
      const txResponse = await server.sendTransaction(tx);
      await new Promise(resolve => setTimeout(resolve, 5000));
      const finalTx = await server.getTransaction(txResponse.hash);

      if (finalTx.status !== "SUCCESS") {
        throw new Error(`Transaction failed: ${finalTx.status}`);
      }

      setHash(txResponse.hash);
      setStatus("SUCCESS");

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Minting error:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkTransactionDetails = async () => {
    if (!hash) return;

    try {
      const response = await server.getTransaction(hash);
      setStatus(response.status);

      if (response.status === "SUCCESS" && response.returnValue) {
        const result = scValToNative(response.returnValue);
        console.log("Transaction result:", result);
      }
    } catch (err) {
      setError("Error checking transaction");
      console.error("Status check error:", err);
    }
  };

  return (
    <div className="text-center w-full max-w-md mx-auto p-4 space-y-4">
      {error && <p className="text-red-500 bg-red-100 p-2 rounded-lg">{error}</p>}
      
      {!publicKey ? (
        <Button onClick={fetchAddress} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Connected: {publicKey.slice(0, 6)}...{publicKey.slice(-4)}
          </p>

          <input
            type="number"
            min="1"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter Token ID"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          <Button onClick={handleMint} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white w-full">
            {loading ? "Minting..." : "Mint NFT"}
          </Button>
        </div>
      )}

      {hash && (
        <div >
          


          <a 
      href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline text-sm block mt-2"
    >
      Success: View transaction
    </a>
          
          
          
        </div>
      )}
    </div>
  );
}
