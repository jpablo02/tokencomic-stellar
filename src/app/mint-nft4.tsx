import * as React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "../app/chapter4/abi";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";

const uris = 
  "ipfs://QmawwR2YjAeZ3Kr3qQ2mC1Gj35hHiWD4wsvz5AMHKgGLLr"


export function MintNFT4() {
  const { address } = useAccount();
  const tokenId = 0;

  

  console.log("address", address);
  console.log("tokenId", tokenId);
  console.log("uri", uris);

  const { data: hash, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) {
      console.error("Address is undefined");
      return;
    }
    writeContract({
      address: "0x6BA0ea0Fd4eCF22CE429114A5950c78Cba5d9eC1",
      abi,
      functionName: "safeMint",
      args: [address as Address,uris],
    });
  }

  return (
    <form onSubmit={submit} className="text-center w-full max-w-md mx-auto">
      <Button>
        
          Mint NFT
        
      </Button>
      {hash && (
        <div className="mt-4 text-yellow-500">Transaction Hash: {hash}</div>
      )}
    </form>
  );
}
