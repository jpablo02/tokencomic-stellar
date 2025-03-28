import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function GET() {
  try {
    const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID;
    const sourceAccount = process.env.SOURCE_ACCOUNT;
    const network = 'testnet';

    // Validación de variables de entorno
    if (!contractId || !sourceAccount) {
      return NextResponse.json(
        { error: "Missing environment variables" },
        { status: 500 }
      );
    }

    const command = `soroban contract invoke \
      --id ${contractId} \
      --network ${network} \
      --source-account ${sourceAccount} \
      -- get_last_token_id`;

    return await new Promise<NextResponse>((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Execution error:', { error, stderr });
          resolve(
            NextResponse.json(
              { error: "Command failed", details: stderr },
              { status: 500 }
            )
          );
        } else {
          const result = stdout.trim().replace(/"/g, '');
          resolve(NextResponse.json({ tokenId: result }));
        }
      });
    });
    
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}