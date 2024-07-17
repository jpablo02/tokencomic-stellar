import * as React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "./abi";
import type { Address } from "viem";

export function MintNFT() {
  const { address } = useAccount();
  const tokenId = 0;
  const uri = "ipfs://QmawwR2YjAeZ3Kr3qQ2mC1Gj35hHiWD4wsvz5AMHKgGLLr";

  console.log('address', address);
  console.log('tokenId', tokenId);
  console.log('uri', uri);

  const { data: hash, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) {
      console.error('Address is undefined');
      return;
    }
    writeContract({
      address: "0xC54aC8471C12c68D30D758Fa3f659e6769ED52cf",
      abi,
      functionName: "safeMint",
      args: [address as Address, uri],
    });
  }

  return (
    <form onSubmit={submit}>
      <button type="submit">Mint NFT</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  );
}
