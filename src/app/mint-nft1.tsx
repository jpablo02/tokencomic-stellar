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

//const CONTRACT_ID = "CCQU6CKNB37243VMZQUF6NAQ5HXHP5SET7FUUSJREZI4SPC5DGY5YIKH";
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
  const [nextTokenId, setNextTokenId] = useState<string | null>(null);
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);
  const [tokenUri, setTokenUri] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);

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
      setNextTokenId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
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
        console.error("Error obteniendo token URI:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
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

  return (
    <div className="text-center max-w-md mx-auto p-4">
      {error && (
        <div className="text-center p-4 bg-red-100 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {mintedTokenId ? (
        <>
          <div className="bg-green-100 text-green-600 p-3 rounded-lg">
            <p className="font-bold">¡NFT Minteado!</p>
            <p>Token ID: {mintedTokenId}</p>
          </div>

          {hash && (
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block mt-2"
            >
              Ver transacción en Blockchain
            </a>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                Ver tu NFT
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90vw] md:max-w-[500px] p-6">
              <div className="relative">
                <DialogClose className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100">
                  <X className="h-5 w-5 text-gray-500" />
                </DialogClose>

                {metadata && (
                  <Card className="bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg border-0">
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
                      <div className="group relative w-full overflow-hidden rounded-xl border-2 border-purple-100">
                        <img 
                          src={`https://ipfs.io/ipfs/${metadata.url.replace('ipfs://', '')}`}
                          alt="NFT Preview" 
                          className="w-full h-64 object-contain transform transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      
                      <div className="text-center px-4 py-3 bg-white rounded-lg border border-purple-50">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {metadata.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {console.log("Metadatos del NFT:", metadata)}
        </>
      ) : (
        <Button
          onClick={handleMint}
          disabled={loading || !nextTokenId}
          className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 w-full"
        >
          {loading ? "Procesando..." : "Mintear NFT Ahora"}
        </Button>
      )}
    </div>
  );
}