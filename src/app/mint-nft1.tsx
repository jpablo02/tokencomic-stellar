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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

const CONTRACT_ID = "CD4B7WGOPIY6GMZI2F22FICQJSD4COVJHBD46X4AMQ7TWTZLZM6Z3R2E";

const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org/");
const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: allowAllModules(),
});

// Componente Spinner reutilizable
const Spinner = () => (
  <svg 
    className="animate-spin h-5 w-5 text-white" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    ></circle>
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export function MintNFTStellar() {
  const [hash, setHash] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nextTokenId, setNextTokenId] = useState<string | null>(null);
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);
  const [tokenUri, setTokenUri] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'preparing' | 'signing' | 'minting' | 'success'>('idle');

  useEffect(() => {
    const initialize = async () => {
      try {
        const { address } = await kit.getAddress();
        setPublicKey(address);
        
        const response = await fetch("/api/test");
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

    try {
      setStatus('preparing');
      setError(null);

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

      setStatus('preparing');
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

      setStatus('preparing');
      const simulateResult = await server.simulateTransaction(transaction);
      if ("error" in simulateResult) {
        throw new Error(simulateResult.error);
      }

      setStatus('signing');
      const preparedTx = SorobanRpc.assembleTransaction(transaction, simulateResult).build();
      const { signedTxXdr } = await kit.signTransaction(preparedTx.toXDR(), {
        address: publicKey,
        networkPassphrase,
      });

      if (!signedTxXdr) throw new Error("Firma fallida");

      setStatus('minting');
      const tx = TransactionBuilder.fromXDR(signedTxXdr, networkPassphrase);
      const txResponse = await server.sendTransaction(tx);
      
      setMintedTokenId(nextTokenId);
      setHash(txResponse.hash);
      setNextTokenId(null);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setStatus('idle');
    }
  };

  const fetchTokenUri = async () => {
    if (!mintedTokenId) return;

    try {
      const response = await fetch("/api/uri");
      const data = await response.json();
      
      if (data.tokenUri) {
        setTokenUri(data.tokenUri);
      } else {
        console.error("Error token URI:", data.error);
      }
    } catch (error) {
      console.error("Error asking:", error);
    }
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!tokenUri) return;
      
      try {
        const response = await fetch(tokenUri);
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setError("Error al cargar metadatos");
      }
    };

    fetchMetadata();
  }, [tokenUri]);

  useEffect(() => {
    if (mintedTokenId) {
      fetchTokenUri();
    }
  }, [mintedTokenId]);

  const getButtonContent = () => {
    switch (status) {
      case 'preparing':
        return (
          <div className="flex items-center justify-center gap-2 text-sm">
            <Spinner />
            Preparing Transaction...
          </div>
        );
      case 'signing':
        return (
          <div className="flex items-center justify-center gap-2 text-sm">
            <Spinner />
            Awaiting Wallet...
          </div>
        );
      case 'minting':
        return (
          <div className="flex items-center justify-center gap-2 text-sm">
            <Spinner />
            Minting NFT...
          </div>
        );
      default:
        return <span className="text-xs">Save Bag (Mint)</span>;
    }
  };

  return (
    <div className="text-center max-w-md mx-auto p-4">
      {error && (
        <div className="text-center p-4 bg-red-100 text-red-600 rounded-lg mb-4">
          {error}
        </div>
      )}

      {mintedTokenId ? (
        <>
          <div className="bg-gray-900 text-yellow-600 p-2 rounded-lg text-sm">
            <p className="font-bold">¡You have the piece!</p>
            <p>Token ID: {mintedTokenId}</p>

            {hash && (
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block mt-2 text-sm"
            >
              Blockchain Transaction
            </a>
          )}
          </div>

          

          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white text-sm">
                Open Bag
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90vw] bg-gray-900 md:max-w-[500px] p-6">
              <div className="relative bg-gray-600">
                

                {metadata && (
                  <Card className=" from-purple-50 to-blue-50 shadow-lg border-0 bg-gray-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-3xl font-bold text-purple-600">
                        {metadata.name}
                      </CardTitle>
                    </CardHeader>

                    <div className="px-6">
                      <div className="inline-block bg-purple-100 px-4 py-2 rounded-full mb-4">
                        <h1 className="text-sm font-mono font-semibold text-purple-800">
                          #{metadata.code}
                        </h1>
                      </div>
                    </div>

                    <CardContent className="space-y-4">
                      <div className="group relative w-full overflow-hidden rounded-xl border-0 border-purple-100">
                        <img 
                          src={`https://ipfs.io/ipfs/${metadata.url.replace('ipfs://', '')}`}
                          alt="NFT Preview" 
                          className="w-full h-64 object-contain transform transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      
                      <div className="text-center px-4 py-3 bg-gray-400 rounded-lg border border-purple-50">
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {metadata.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Button
          onClick={handleMint}
          disabled={status !== 'idle'}
          className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 w-full transition-all"
          style={{
            cursor: status !== 'idle' ? 'wait' : 'pointer',
            opacity: status !== 'idle' ? 0.7 : 1
          }}
        >
          {getButtonContent()}
        </Button>
      )}
    </div>
  );
}