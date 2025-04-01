// /home/kali/Documents/jp/tokencomicbnb/tokenComicBNB/src/app/api/uri/route.ts
import { NextResponse } from 'next/server';
import {
  SorobanRpc,
  TransactionBuilder,
  Networks,
  Operation,
  Address,
  scValToNative,
  xdr,
} from "@stellar/stellar-sdk";

const CONTRACT_ID = "CD4B7WGOPIY6GMZI2F22FICQJSD4COVJHBD46X4AMQ7TWTZLZM6Z3R2E";
const SOURCE_ACCOUNT = "SDGG75IDQWE357QSKGUS7KKSJJN25OUZ7BVZ6EX6GIDVPGLAQXMOQIVH";
const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org/");

async function getLastTokenId(): Promise<{ tokenId: string }> {
  try {
    const networkPassphrase = Networks.TESTNET;
    
    // Obtener cuenta fuente
    const sourceAccount = await server.getAccount(SOURCE_ACCOUNT);

    // Construir transacción de lectura
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: "1000000",
      networkPassphrase,
    })
      .addOperation(
        Operation.invokeContractFunction({
          contract: CONTRACT_ID,
          function: "get_last_token_id",
          args: [],
        })
      )
      .setTimeout(0)  // No timeout para operación de lectura
      .build();

    // Simular transacción
    const simulateResponse = await server.simulateTransaction(transaction);
    
    if (SorobanRpc.Api.isSimulationError(simulateResponse)) {
      throw new Error(simulateResponse.error);
    }
    
    if (!simulateResponse.result) {
      throw new Error("No result in simulation response");
    }

    // Decodificar resultado
    const result = scValToNative(simulateResponse.result.retval);
    const tokenId = (result as xdr.Int128Parts).lo().toString();

    return { tokenId };

  } catch (error) {
    console.error("Error fetching token ID:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function GET() {
  try {
    const { tokenId } = await getLastTokenId();
    return NextResponse.json({ tokenId });
    
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: "Error fetching token ID",
        message: error.message 
      },
      { status: 500 }
    );
  }
}