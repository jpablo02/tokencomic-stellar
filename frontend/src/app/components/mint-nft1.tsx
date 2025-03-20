import * as React from "react";


import type { Address } from "viem";
import { Button } from "./button";

const uris =
  "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmW2qQuYi5EX5otSxhN16XpFDgDA4QE1weyuyxXVhQQvpw";

export function MintNFT1() {
 
  const tokenId = 0;

  
  console.log("tokenId", tokenId);
  console.log("uri", uris);

  

  

  return (
    <form onSubmit={onsubmit} className="text-center w-full max-w-md mx-auto">
      <Button>Mint NFT</Button>
      <div >
     
      </div>
    </form>
  );
}
