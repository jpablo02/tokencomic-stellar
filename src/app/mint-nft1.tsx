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
  Account,
  Transaction,
  Address,
  xdr,
} from "@stellar/stellar-sdk";

const CONTRACT_ID = "CCNS4SIP6SHHRV2KHIKDWZ7FTFTNOPWZO6BCGGK3WP24TWEUGR2MEYBU";

// 🔹 Servidor Soroban correcto para TESTNET
const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org/");

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
      // 🔹 Obtener cuenta desde el servidor Soroban
      const account = await server.getAccount(publicKey);

        // 🔹 Convertir la dirección a `ScVal`
        const userAddressScVal = xdr.ScVal.scvAddress(
          new Address(publicKey).toScAddress()
        );

      // 🔹 Construir la transacción con la cuenta correcta
      const transaction = new TransactionBuilder(account, {
        fee: "100",
        networkPassphrase: Networks.TESTNET, // ✅ Usar `Networks.TESTNET` correctamente
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

      // 🔹 Convertir a XDR y firmar la transacción
      const { signedTxXdr } = await kit.signTransaction(transaction.toXDR(), {
        address: publicKey,
        networkPassphrase: WalletNetwork.TESTNET,
      });

      // 🔹 Convertir el XDR firmado a una transacción válida
      const signedTransaction = new Transaction(signedTxXdr, Networks.TESTNET);

      // 🔹 Preparar la transacción antes de enviarla
      const preparedTx = await server.prepareTransaction(signedTransaction);

      // 🔹 Enviar la transacción preparada
      const txResponse = await server.sendTransaction(preparedTx);
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
