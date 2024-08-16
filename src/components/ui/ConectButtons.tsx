"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import { ScrollArea } from "./scroll-area";
import { MintNFT } from "../../app/mint-nft";

export const ConnectButtons = () => {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data: hash, writeContract } = useWriteContract();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Maneja el cierre del dropdown cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    
    <div className="relative" ref={dropdownRef}>
      {!isConnected ? (
        <button
          onClick={toggleDropdown}
          type="button"
          className="bg-orange-400 hover:bg-black hover:text-gray-300 text-black font-semibold py-0 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          {hash && (
          <div className="mt-4 text-yellow-500">Transaction Hash: {hash}</div>
        )}
          Connect Wallet
        </button>
      ) : (
        <>
          <div className="mb-4">
            <span className="font-medium">Status:</span> {isConnected ? "Connected" : "Disconnected"}
            <br />
            <span className="font-medium">Address:</span> {address}
          </div>
          <button
            type="button"
            onClick={() => disconnect()}
            className="bg-gray-400  hover:bg-gray-500 text-white font-semibold py-0 px-2 rounded-lg transition duration-300 ease-in-out"
          >
            Desconectar
          </button>
          
        </>
        
      )}

      {isOpen && !isConnected && (
        <div className="absolute bg-gray-400 border-0 border-gray-400 mt-2 py-2 rounded-lg shadow-lg w-64">
          <ScrollArea className="h-48">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                  setIsOpen(false); // Cierra el dropdown después de seleccionar una wallet
                }}
                type="button"
                className="block w-full text-left px-4 py-2 text-black hover:bg-gray-600"
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
