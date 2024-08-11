import React from 'react';
import Image from 'next/image';
import { MintNFT } from '../../app/mint-nft'; // Ajusta la ruta según sea necesario

const NftCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {/* Card 1 */}
      <div className="card bg-base-100 w-full max-w-md shadow-xl max-h-fit mb-4">
        <Image
          src="https://bafybeihv6rzseuad62u67gtsihwwlx6mhia22cxudc3i7xia4gka4mzaxi.ipfs.dweb.link/12.png"
          priority
          quality={100}
          width={506}
          height={506}
          alt="Image"
          className="object-contain"
        />
        <div className="card-body">
          <h2 className="card-title">Kiara</h2>
          <p>Mom</p>
          <div className="card-actions justify-end">            
            <MintNFT /> {/* Botón Mint NFT */}
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card bg-base-100 w-full max-w-md shadow-xl mx-auto mb-4">
        <Image
          src="https://bafybeihv6rzseuad62u67gtsihwwlx6mhia22cxudc3i7xia4gka4mzaxi.ipfs.dweb.link/13.png"
          priority
          quality={100}
          width={506}
          height={506}
          alt="Description of image"
          className="object-contain"
        />
        <div className="card-body">
          <h2 className="card-title">Hassan</h2>
          <p>The animal</p>
          <div className="card-actions justify-end">            
            <MintNFT /> {/* Botón Mint NFT */}
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card bg-base-100 w-full max-w-md shadow-xl mx-auto mb-4">
        <Image
          src="https://bafybeihv6rzseuad62u67gtsihwwlx6mhia22cxudc3i7xia4gka4mzaxi.ipfs.dweb.link/11.png"
          priority
          quality={100}
          width={506}
          height={506}
          alt="Description of image"
          className="object-contain"
        />
        <div className="card-body">
          <h2 className="card-title">Chokee</h2>
          <p>The tender</p>
          <div className="card-actions justify-end">
            
            <MintNFT /> {/* Botón Mint NFT */}
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="card bg-base-100 w-full max-w-md shadow-xl mx-auto mb-4">
        <Image
          src="https://bafybeihv6rzseuad62u67gtsihwwlx6mhia22cxudc3i7xia4gka4mzaxi.ipfs.dweb.link/10.png"
          priority
          quality={100}
          width={506}
          height={506}
          alt="Description of image"
          className="object-contain"
        />
        <div className="card-body">
          <h2 className="card-title">Pepa</h2>
          <p>The agile</p>
          <div className="card-actions justify-end">            
            <MintNFT /> {/* Botón Mint NFT */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCards;
