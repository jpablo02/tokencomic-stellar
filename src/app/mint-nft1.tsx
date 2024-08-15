import * as React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "../app/chapter1/abi";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";

const uris = 
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmW2qQuYi5EX5otSxhN16XpFDgDA4QE1weyuyxXVhQQvpw"


export function MintNFT1() {
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
      address: "0x1D4de18300d2869B50632A5Fc67c1Ddd1A07F4b6",
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
