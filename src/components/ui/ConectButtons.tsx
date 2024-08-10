"use client";

import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export const ConnectButtons = () => {
    const { address, isConnected } = useAccount();
    const { connectors, connect, status, error } = useConnect();
    const { disconnect } = useDisconnect();

  return (
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
  );
};
