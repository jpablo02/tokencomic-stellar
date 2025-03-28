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

const CONTRACT_ID = "CCQU6CKNB37243VMZQUF6NAQ5HXHP5SET7FUUSJREZI4SPC5DGY5YIKH";

const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org/");
const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: allowAllModules(),
});

export function MintNFTStellar() {
  const [hash, setHash] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextTokenId, setNextTokenId] = useState<string>("");
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);

  // Carga inicial automática
  useEffect(() => {
    const initialize = async () => {
      try {
        // 1. Conectar wallet automáticamente
        const { address } = await kit.getAddress();
        setPublicKey(address);
        
        // 2. Obtener último token ID
        const response = await fetch('/api/test');
        const data = await response.json();
        const lastId = parseInt(data.tokenId);
        setNextTokenId((lastId + 1).toString());
      } catch (err) {
        setError("Conecta tu wallet para comenzar");
      }
    };
    
    initialize();
  }, []);

  const handleMint = async () => {
    if (!publicKey || !nextTokenId) return;

    setLoading(true);
    setError(null);

    try {
      const account = await server.getAccount(publicKey);
      const networkPassphrase = Networks.TESTNET;

      const mintArgs = [
        xdr.ScVal.scvAddress(Address.fromString(publicKey).toScAddress()),
        xdr.ScVal.scvI128(
          new xdr.Int128Parts({
            hi: new xdr.Int64(0),
            lo: new xdr.Uint64(BigInt(nextTokenId)),
          })
        ),
      ];

      const transaction = new TransactionBuilder(account, {
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
        throw new Error(simulateResult.error);
      }

      const preparedTx = SorobanRpc.assembleTransaction(transaction, simulateResult).build();
      const { signedTxXdr } = await kit.signTransaction(preparedTx.toXDR(), {
        address: publicKey,
        networkPassphrase,
      });

      if (!signedTxXdr) throw new Error("Firma fallida");

      const tx = TransactionBuilder.fromXDR(signedTxXdr, networkPassphrase);
      const txResponse = await server.sendTransaction(tx);
      
      setMintedTokenId(nextTokenId);
      setHash(txResponse.hash);
      setNextTokenId(""); // Limpiar próximo ID

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center p-4 bg-red-100 text-red-600 rounded-lg max-w-md mx-auto">
        {error}
      </div>
    );
  }

  if (mintedTokenId) {
    return (
      <div className="text-center space-y-4 max-w-md mx-auto p-4">
        <div className="bg-green-100 text-green-600 p-3 rounded-lg">
          <p className="font-bold">¡NFT Minteado!</p>
          <p>Token ID: {mintedTokenId}</p>
        </div>
        
        {hash && (
          <a
            href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline block"
          >
            Ver transacción en Blockchain
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="text-center max-w-md mx-auto p-4">
      {publicKey ? (
        <Button
          onClick={handleMint}
          disabled={loading || !nextTokenId}
          className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 w-full"
        >
          {loading ? "Procesando..." : "Mintear NFT Ahora"}
        </Button>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Conectando wallet...</p>
        </div>
      )}
    </div>
  );
}