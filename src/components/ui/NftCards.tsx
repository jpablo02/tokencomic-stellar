import React from "react";
import Image from "next/image";
import { MintNFT } from "../../app/mint-nft";
import AnimatedCircle from "../ui/AnimatedCircle"; // Ajusta la ruta según sea necesario
import { Button } from "./button";

const NftCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {/* Card 1 */}
      <div className="relative bg-base-100 w-full max-w-md shadow-xl max-h-fit mb-4">
        <AnimatedCircle className="absolute inset-0 z-0 w-full h-full" />
        <iframe
          src="https://bafybeiexjn4b7ewg2a7embuyrfooxqk7nsbkds3chcbqdgxkz3gbbybmuq.ipfs.dweb.link/1.png" // Ajusta la URL según la ruta de tu frame Frog
          title="Frame 1"
          width="100%"
          height="400px" // Ajusta la altura según el tamaño de tu frame
          frameBorder="0"
          className="object-contain relative z-10"
        />
        <div className="card-body relative z-10">
          <h2 className="card-title">Kiara</h2>
          <p>Mom</p>
          <div className="card-actions justify-end">
            <MintNFT /> {/* Botón Mint NFT */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCards;
