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
import { Keypair } from "@stellar/stellar-sdk";

const CONTRACT_ID = "CD4B7WGOPIY6GMZI2F22FICQJSD4COVJHBD46X4AMQ7TWTZLZM6Z3R2E";
const SIGNER_PRIVATE_KEY = "SDGG75IDQWE357QSKGUS7KKSJJN25OUZ7BVZ6EX6GIDVPGLAQXMOQIVH";
const SIGNER_PUBLIC_KEY = "GDQP2KPQGKSXNEICFJKG5M5VVD7HLDXKPQJWLG4NADSVAR2GCD5UFKJT";
const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org/");
const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: allowAllModules(),
});

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
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

  // useEffect para manejar la conexión de la wallet
  useEffect(() => {
    const connectWallet = async () => {
      try {
        const { address } = await kit.getAddress();
        if (!address) throw new Error("Wallet not connected");
        setPublicKey(address);
      } catch (err) {
        setError("Connect your wallet to start");
      }
    };

    if (kit) connectWallet();
  }, [kit]);

  const getLastTokenId = async (): Promise<number> => {
    try {
      // 1. Cargar cuenta desde la clave privada
      const keypair = Keypair.fromSecret(SIGNER_PRIVATE_KEY);
      const sourceAccount = await server.getAccount(keypair.publicKey());

      // 2. Construir transacción
      const transaction = new TransactionBuilder(sourceAccount, {
        fee: "1000000",
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.invokeContractFunction({
            contract: CONTRACT_ID,
            function: "get_last_token_id",
            args: [],
          })
        )
        .setTimeout(0)
        .build();

      // 3. Firmar localmente con la clave privada
      transaction.sign(keypair);

      // 4. Simular transacción firmada
      const simulateResponse = await server.simulateTransaction(transaction);

      if (SorobanRpc.Api.isSimulationError(simulateResponse)) {
        throw new Error(simulateResponse.error);
      }

      // 5. Decodificar resultado
      const result = scValToNative(simulateResponse.result!.retval);
      return parseInt(result.toString()); // Asumiendo que devuelve u128 directo
    } catch (error) {
      console.error("Error fetching last token ID:", error);
      throw error;
    }
  };
  // useEffect separado para cargar datos una vez publicKey está disponible
  useEffect(() => {
    const fetchTokenData = async () => {
      if (!publicKey) return;

      try {
        const lastId = await getLastTokenId();
        setNextTokenId((lastId + 1).toString());
      } catch (err) {
        setError("Error loading contract data");
      }
    };

    fetchTokenData();
  }, [publicKey]); // <-- ¡Ejecutar cuando publicKey cambie!

  // Función para obtener el último token ID
  // Función getLastTokenId actualizada


  // Función para obtener metadata del token
  const getTokenUri = async (tokenId: string): Promise<string> => {
    try {
      const sourceAccount = await server.getAccount(publicKey!);
      const networkPassphrase = Networks.TESTNET;

      const args = [
        xdr.ScVal.scvI128(
          new xdr.Int128Parts({
            hi: new xdr.Int64(0),
            lo: new xdr.Uint64(BigInt(tokenId)),
          })
        ),
      ];

      const transaction = new TransactionBuilder(sourceAccount, {
        fee: "1000000",
        networkPassphrase,
      })
        .addOperation(
          Operation.invokeContractFunction({
            contract: CONTRACT_ID,
            function: "token_uri",
            args,
          })
        )
        .setTimeout(0)
        .build();

      const simulateResponse = await server.simulateTransaction(transaction);

      if (SorobanRpc.Api.isSimulationError(simulateResponse)) {
        throw new Error(simulateResponse.error);
      }

      const result = scValToNative(simulateResponse.result!.retval);
      if (typeof result !== "string") throw new Error("Invalid token URI format");
      return result;
    } catch (error) {
      console.error("Error fetching token URI:", error);
      throw error;
    }
  };



  useEffect(() => {
    const fetchMetadata = async () => {
      if (!mintedTokenId) return;

      try {
        const uri = await getTokenUri(mintedTokenId);
        setTokenUri(uri);

        const response = await fetch(uri);
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setError("Error fetching metadata");
      }
    };

    fetchMetadata();
  }, [mintedTokenId]);

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
      if ("error" in simulateResult) throw new Error(simulateResult.error);

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

  const getButtonContent = () => {
    switch (status) {
      case "preparing":
        return <><Spinner /> Preparando...</>;
      case "signing":
        return <><Spinner /> Firmando...</>;
      case "minting":
        return <><Spinner /> Minteando...</>;
      case "success":
        return "¡NFT Minteado!";
      default:
        return "Mintear NFT";
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
                Save Bag
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90vw] bg-gray-900 md:max-w-[500px] p-6">
              <div className="relative bg-gray-600">
                {metadata && (
                  <Card className="from-purple-50 to-blue-50 shadow-lg border-0 bg-gray-300">
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