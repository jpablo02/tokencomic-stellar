"use client";

import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MintNFT } from "./mint-nft";

function App() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div className="w-full text-center bg-black p-6 shadow-lg rounded-md mb-6">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400 uppercase">
          Connect
        </h2>
        <div className="space-y-2">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              type="button"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              {connector.name}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-400">{status}</div>
        {error && <div className="text-red-500 mt-2">{error.message}</div>}
      </div>

      <main>
        
        homepage
        
        </main>

      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
        <div className="text-center w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Account</h2>
          <div className="card bg-base-100 w-full max-w-md shadow-xl mx-auto mb-4">
            <figure>
              <img
                src="http://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmZZF8tSNEbijgtKc3nyV2zMDXysdid3Joakkyuo7H1nac"
                alt="Fortune Cookies"
                className="w-full h-auto"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Fortune Cookie</h2>
              <p>Take one daily</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Break a Cookie</button>
              </div>
            </div>
          </div>
          <div className="mb-4">
            status: {isConnected ? "connected" : "disconnected"}
            <br />
            address: {address}
          </div>
          {isConnected && <MintNFT />}
          {isConnected && (
            <button
              type="button"
              onClick={() => disconnect()}
              className="btn btn-secondary mb-4"
            >
              Disconnect
            </button>
          )}
        </div>
      </div> */}
    </>
  );
}

export default App;
