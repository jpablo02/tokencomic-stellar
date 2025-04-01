// /home/kali/Documents/jp/tokencomicbnb/tokenComicBNB/src/app/api/test/route.ts
import {
  SorobanRpc,
  TransactionBuilder,
  Networks,
  Operation,
  Address,
  xdr,
  Keypair,
  TimeoutInfinite,
} from "@stellar/stellar-sdk";

const CONTRACT_ID = "CD4B7WGOPIY6GMZI2F22FICQJSD4COVJHBD46X4AMQ7TWTZLZM6Z3R2E";
const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org/");

export async function mintNFT(publicKey: string, tokenId: string) {
  try {
    const networkPassphrase = Networks.TESTNET;
    const account = await server.getAccount(publicKey);

    // Construir argumentos para el contrato
    const mintArgs = [
      xdr.ScVal.scvAddress(Address.fromString(publicKey).toScAddress()),
      xdr.ScVal.scvI128(
        new xdr.Int128Parts({
          hi: new xdr.Int64(0),
          lo: new xdr.Uint64(BigInt(tokenId)),
        })
      ),
    ];

    // Construir transacción
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

    // Simular y preparar transacción
    const simulateResult = await server.simulateTransaction(transaction);
    if ("error" in simulateResult) {
      throw new Error(simulateResult.error);
    }
    
    const preparedTx = SorobanRpc.assembleTransaction(transaction, simulateResult).build();

    // Firmar con clave del servidor (usar variables de entorno en producción)
    const signerKeypair = Keypair.fromSecret(process.env.STELLAR_SECRET_KEY!);
    preparedTx.sign(signerKeypair);

    // Enviar transacción
    const txResponse = await server.sendTransaction(preparedTx);
    return { hash: txResponse.hash };

  } catch (error) {
    console.error("Minting error:", error);
    throw new Error(error instanceof Error ? error.message : "Minting failed");
  }
}

// Handler para el endpoint POST /api/test
export async function POST(request: Request) {
  try {
    const { publicKey, tokenId } = await request.json();
    
    if (!publicKey || !tokenId) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await mintNFT(publicKey, tokenId);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}