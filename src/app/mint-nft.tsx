import * as React from "react";
import { useWriteContract } from 'wagmi'
import { abi } from './abi'


export function MintNFT() {

    const { data: hash, writeContract } = useWriteContract()


  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenId = formData.get("tokenId") as string

    writeContract({
        address: '0xC54aC8471C12c68D30D758Fa3f659e6769ED52cf',
        abi,
        functionName: 'safeMint',
        args: [address,(tokenId)],
      })

  }

  return (
    
      <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button type="submit">BRK CKI</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  );
}
