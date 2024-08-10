"use client";

import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export const ConnectButtons = () => {
    const { address, isConnected } = useAccount();
    const { connectors, connect, status, error } = useConnect();
    const { disconnect } = useDisconnect();

  return (
    <div className="flex justify-between items-center">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          type="button"
          className=" hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          {connector.name}
        </button>
      ))}
    </div>
    
  );
};
