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

const CONTRACT_ID = "CDFDKITIUDA54O3FDNV22BSTLCYXQS5MVPWNOTA5LNZC2VUCUYYTHMPI";
const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org/");
const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: allowAllModules(),
});
const useTokenCounter = () => {
  const [tokenId, setTokenId] = useState<bigint>(() => {
    const saved = localStorage.getItem("nftTokenId");
    return saved ? BigInt(saved) : 3n;
  });

  useEffect(() => {
    localStorage.setItem("nftTokenId", tokenId.toString());
  }, [tokenId]);

  const incrementTokenId = () => setTokenId(prev => prev + 1n);

  return { tokenId, incrementTokenId };
};
export function MintNFTStellar() {
  const [hash, setHash] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { tokenId, incrementTokenId } = useTokenCounter();

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

    setLoading(true);
    setError(null);
    setHash(null);
    setStatus(null);

    try {
      const account = await server.getAccount(publicKey);
      const networkPassphrase = Networks.TESTNET;

      // Construcción CORRECTA de parámetros
      const mintArgs = [
        xdr.ScVal.scvAddress(Address.fromString(publicKey).toScAddress()),
        xdr.ScVal.scvI64(new xdr.Int64(Number(tokenId)))
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

      const preparedTx = SorobanRpc.assembleTransaction(
        transaction, 
        simulateResult
      ).build();

      const { signedTxXdr } = await kit.signTransaction(preparedTx.toXDR(), {
        address: publicKey,
        networkPassphrase,
      });

      if (!signedTxXdr) throw new Error("Signing failed");

      const tx = TransactionBuilder.fromXDR(signedTxXdr, networkPassphrase);
      const txResponse = await server.sendTransaction(tx);
      const finalTx = await server.getTransaction(txResponse.hash);

      if (finalTx.status !== "SUCCESS") {
        throw new Error(`Transaction failed: ${finalTx.status}`);
      }

      setHash(txResponse.hash);
      incrementTokenId();
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
      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded-lg">{error}</p>
      )}
      
      {!publicKey ? (
        <Button
          onClick={fetchAddress}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Connected: {publicKey.slice(0, 6)}...{publicKey.slice(-4)}</p>
          <p className="text-sm text-gray-600">Next Token ID: {tokenId}</p>
          
          <Button
            onClick={handleMint}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white w-full"
          >
            {loading ? "Minting..." : "Mint NFT"}
          </Button>
        </div>
      )}

      {hash && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-mono break-words">Tx Hash: {hash}</p>
          
          <Button
            onClick={checkTransactionDetails}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white"
            disabled={loading}
          >
            Verify Transaction
          </Button>
          
          {status && (
            <div className="mt-2">
              <p className="text-sm font-semibold">Status:</p>
              <p
                className={`${
                  status === "SUCCESS"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {status}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}