import * as React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "../app/chapter3/abi";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";

const uris = 
  "https://gateway.lighthouse.storage/ipfs/bafkreia2ol4xo24rp26qdwaafyegajqnya4zi3uf4hnnt33qexqg3qluiu"


export function MintNFT3() {
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
      address: "0x4329Eb272A511b97b2612312C253ec160a33B112",
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
