// services/mintNFT.ts
import { Networks, SorobanRpc, TransactionBuilder } from '@stellar/stellar-sdk';
import { Contract, Address } from '@stellar/stellar-sdk';
import { initializeKit, getPublicKey, signTransaction } from '@creit.tech/stellar-wallets-kit';

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID!;
const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");

export const mintNFT = async () => {
  // Inicializar Kit
  const kit = await initializeKit();
  
  // Obtener cuenta
  const publicKey = await getPublicKey();
  const account = await server.getAccount(publicKey);

  // Preparar transacción
  const contract = new Contract(CONTRACT_ID);
  const tx = new TransactionBuilder(account, {
    fee: "1000",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(contract.call("mint", Address.fromString(publicKey)))
    .setTimeout(30)
    .build();

  // Firmar
  const signedTx = await signTransaction(tx);
  
  // Enviar
  const response = await server.sendTransaction(signedTx);
  return response;
};