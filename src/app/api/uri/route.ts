import { NextResponse } from 'next/server';
import {
  SorobanRpc,
  TransactionBuilder,
  Networks,
  Operation,
  scValToNative,
  xdr,
} from "@stellar/stellar-sdk";

const CONTRACT_ID = "CD4B7WGOPIY6GMZI2F22FICQJSD4COVJHBD46X4AMQ7TWTZLZM6Z3R2E";
const SOURCE_ACCOUNT = "GDQP2KPQGKSXNEICFJKG5M5VVD7HLDXKPQJWLG4NADSVAR2GCD5UFKJT";
const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org/");

async function getTokenUri(): Promise<{ tokenUri: string }> {
  try {
    const networkPassphrase = Networks.TESTNET;
    const sourceAccount = await server.getAccount(SOURCE_ACCOUNT);

    // Construir transacción de lectura
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: "1000000",
      networkPassphrase,
    })
      .addOperation(
        Operation.invokeContractFunction({
          contract: CONTRACT_ID,
          function: "token_uri",
          args: [],
        })
      )
      .setTimeout(0)
      .build();

    // Simular y obtener resultado
    const simulateResponse = await server.simulateTransaction(transaction);
    
    if (SorobanRpc.Api.isSimulationError(simulateResponse)) {
      throw new Error(simulateResponse.error);
    }
    
    if (!simulateResponse.result) {
      throw new Error("No result in simulation response");
    }

    // Decodificar el valor SCVal a string
    const result = scValToNative(simulateResponse.result.retval);
    
    if (typeof result !== "string") {
      throw new Error("Invalid token URI format");
    }

    return { tokenUri: result };

  } catch (error) {
    console.error("Error fetching token URI:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function GET() {
  try {
    const { tokenUri } = await getTokenUri();
    return NextResponse.json({ tokenUri });
    
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: "Error fetching token URI",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}