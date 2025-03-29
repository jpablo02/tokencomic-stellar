import * as React from "react";



import { Button } from "@/components/ui/button";

const uris = [
  
  "hhttps://ipfs.io/ipfs/QmPA3HJsohJbrefVJ7hvFrLFTNb8Ujx3UV8cjjNY31WtT7",
];

export function MintNFT() {
 

  const randomUri = uris[Math.floor(Math.random() * uris.length)];

  
  console.log("uri", randomUri);

  

  

  return (
    
      <Button>
        
          Mint NFT
        
      </Button>
    
      )}
    

