import * as React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "../app/chapter2/abi";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";

const uris = 
  "https://bafybeielcfhff5xuelm7r44dacatzuud2z3rkwuksl7z2iejpu6sqxao7y.ipfs.dweb.link/"


export function MintNFT2() {
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
      address: "0x6004ad148d749ecd0c9ce796c4633c18591de44b",
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
      
    </form>
  );
}
