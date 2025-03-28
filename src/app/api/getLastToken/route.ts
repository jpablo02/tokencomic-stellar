// app/api/getLastTokenId/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ tokenId: "TEST_OK" });
}