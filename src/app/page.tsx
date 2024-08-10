"use client";
import Photo from "../components/ui/Photo";
import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MintNFT } from "./mint-nft";
import NftCards from "@/components/ui/NftCards";

function App() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="bg-slate-300 flex flex-col xl:flex-row items-center justify-between xl:pt-6 xl:pb-6">
          {/*text */}
          <div className="text-center xl:text-left order-2 xl:order-none pr-10">
            <span className="text-2xl top-30 left-0 ">WEB 3 FUNDATION</span>
            <h1 className="h1 mb-4">
              {"Pets"}
              <br />
              <span className="text-accent">Safe</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I excel at crafting elegant digital experiences and i am
              proficient in various programming languages and technologies
            </p>
          </div>
          {/*NFT */}
          <div>
            <NftCards />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
