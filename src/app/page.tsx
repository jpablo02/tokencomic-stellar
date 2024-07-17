"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MintNFT } from './mint-nft'

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        <h2>Account</h2>

        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://bafybeifcr5flcvjqptfoma4zaq2qtd4ca3upbwvtmyia6bhzk2lwxvmxbi.ipfs.dweb.link/galletaok.png"
              alt="Fortune Cookies"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Fortune Cookie</h2>
            <p>Tke one daily</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Break a Cookie</button>
            </div>
          </div>
        </div>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        <MintNFT />

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      
    </>
  );
}

export default App;
