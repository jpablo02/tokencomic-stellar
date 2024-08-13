"use client";

import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ScrollArea } from "./scroll-area";
import { MintNFT } from "../../app/mint-nft";

export const ConnectButtons = () => {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {!isConnected ? (
        <button
          onClick={toggleDropdown}
          type="button"
          className="bg-orange-400 hover:bg-black hover:text-white text-black font-semibold py-0 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <div className="mb-4">
            <span className="font-medium">Status:</span> {isConnected ? "Connected" : "Disconnected"}
            <br />
            <span className="font-medium">Address:</span> {address}
          </div>
          {isConnected }
          <button
            type="button"
            onClick={() => disconnect()}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Desconectar
          </button>
        </>
      )}

      {isOpen && !isConnected && (
        <div className="absolute bg-white border border-gray-200 mt-2 py-2 rounded-lg shadow-lg w-64">
          <ScrollArea className="h-48">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                  setIsOpen(false); // Cierra el dropdown después de seleccionar una wallet
                }}
                type="button"
                className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
              >
                {connector.name}
              </button>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
