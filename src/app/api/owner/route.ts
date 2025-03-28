import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const { contractId, tokenId, walletAddress } = await req.json();

    if (!contractId || !tokenId || !walletAddress) {
      return NextResponse.json({ error: "Faltan parámetros requeridos" }, { status: 400 });
    }

    // 1️⃣ Comando para obtener el owner del NFT
    const ownerCommand = `
      soroban contract invoke \
      --id ${contractId} \
      --network testnet \
      --source-account ${walletAddress} \
      -- owner_of \
      --token_id ${tokenId}
    `;

    const { stdout: ownerOutput, stderr: ownerError } = await execPromise(ownerCommand);
    if (ownerError) {
      return NextResponse.json({ error: `Error obteniendo el owner: ${ownerError}` }, { status: 500 });
    }

    const owner = ownerOutput.trim().replace(/"/g, ""); // Limpiar el resultado

    if (owner !== walletAddress) {
      return NextResponse.json({ error: "No eres el dueño del NFT" }, { status: 403 });
    }

    // 2️⃣ Comando para obtener la URL de la metadata
    const metadataCommand = `
      soroban contract invoke \
      --id ${contractId} \
      --network testnet \
      --source-account ${walletAddress} \
      -- token_uri
    `;

    const { stdout: metadataOutput, stderr: metadataError } = await execPromise(metadataCommand);
    if (metadataError) {
      return NextResponse.json({ error: `Error obteniendo la metadata: ${metadataError}` }, { status: 500 });
    }

    const metadataUrl = metadataOutput.trim().replace(/"/g, "");

    return NextResponse.json({ owner, metadataUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
