import * as React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "./abi";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";

const uris = [
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/1.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/2.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/3.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/4.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/5.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/6.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/7.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/8.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/9.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/10.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/11.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/12.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/13.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/14.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/15.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/16.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/17.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/18.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/19.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/20.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/21.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/22.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/23.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/24.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/25.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/26.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/27.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/28.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/29.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/30.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/31.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/32.json",
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmV2M7Fig1PpoCeMCB5mSdztBbjocC6h4X6Ct6oro9QHAQ/33.json",
];

export function MintNFT() {
  const { address } = useAccount();
  const tokenId = 0;

  const randomUri = uris[Math.floor(Math.random() * uris.length)];

  console.log("address", address);
  console.log("tokenId", tokenId);
  console.log("uri", randomUri);

  const { data: hash, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) {
      console.error("Address is undefined");
      return;
    }
    writeContract({
      address: "0xC54aC8471C12c68D30D758Fa3f659e6769ED52cf",
      abi,
      functionName: "safeMint",
      args: [address as Address, randomUri],
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
