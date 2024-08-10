import React from 'react';
import Image from 'next/image';

const NftCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      <div className="card bg-base-100 w-full max-w-md shadow-xl mx-auto mb-4">
        <Image
          src="http://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmZZF8tSNEbijgtKc3nyV2zMDXysdid3Joakkyuo7H1nac"
          priority
          quality={100}
          width={506}
          height={506}
          alt="Description of image"
          className="object-contain"
        />
        <div className="card-body">
          <h2 className="card-title">Fortune Cookie</h2>
          <p>Take one daily</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Break a Cookie</button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-full max-w-md shadow-xl mx-auto mb-4">
        <Image
          src="http://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmZZF8tSNEbijgtKc3nyV2zMDXysdid3Joakkyuo7H1nac"
          priority
          quality={100}
          width={506}
          height={506}
          alt="Description of image"
          className="object-contain"
        />
        <div className="card-body">
          <h2 className="card-title">Fortune Cookie</h2>
          <p>Take one daily</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Break a Cookie</button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-full max-w-md shadow-xl mx-auto mb-4">
        <Image
          src="http://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmZZF8tSNEbijgtKc3nyV2zMDXysdid3Joakkyuo7H1nac"
          priority
          quality={100}
          width={506}
          height={506}
          alt="Description of image"
          className="object-contain"
        />
        <div className="card-body">
          <h2 className="card-title">Fortune Cookie</h2>
          <p>Take one daily</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Break a Cookie</button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-full max-w-md shadow-xl mx-auto mb-4">
        <Image
          src="http://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmZZF8tSNEbijgtKc3nyV2zMDXysdid3Joakkyuo7H1nac"
          priority
          quality={100}
          width={506}
          height={506}
          alt="Description of image"
          className="object-contain"
        />
        <div className="card-body">
          <h2 className="card-title">Fortune Cookie</h2>
          <p>Take one daily</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Break a Cookie</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCards;
