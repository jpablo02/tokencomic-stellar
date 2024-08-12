import React from "react";
import Image from "next/image";
import { MintNFT } from "../../app/mint-nft";
import AnimatedCircle from "../ui/AnimatedCircle"; // Ajusta la ruta según sea necesario

const NftCards = () => {
  return (
    <div>
      <AnimatedCircle className="absolute inset-0 z-0 w-full h-full" />
      <div className="relative bg-base-100 w-full max-w-md shadow-xl max-h-fit mb-4">
        <div className="relative z-10">
          <Image
            src="https://bafybeiexjn4b7ewg2a7embuyrfooxqk7nsbkds3chcbqdgxkz3gbbybmuq.ipfs.dweb.link/1.png"
            width={1200}
            height={630}
            alt="Image"
            className="object-contain w-full h-auto"
            layout="responsive" // Ajusta la imagen para que ocupe el 100% del ancho del contenedor
          />
        </div>
        <div className="card-body relative z-10">
          <div className="card-actions justify-end">
            <MintNFT /> {/* Botón Mint NFT */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCards;
