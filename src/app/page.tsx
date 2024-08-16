"use client";
import Photo from "../components/ui/Photo";
import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MintNFT } from "./mint-nft";
import NftCards from "@/components/ui/NftCards";
import path from "path";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function App() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const pathname = usePathname();

  const links = [
    {
      name: "save the animal world with blockchain",
      path: "/about",
    },
  ];

  return (
    <section className="justify-between">
      <section className="h-full bg-[#1E293B] justify-between ">
        <div className="container mx-auto h-full ">
          <div className="bg-[#1E293B] flex flex-col xl:flex-row items-center justify-between xl:pt-6 xl:pb-6 ">
            {/*text */}

            <div className="text-center xl:text-left order-2 xl:order-none pr-0">
             
              <h1 className="h1 mb-4">
                <div className="bg-orange-400 inline-block rounded-2xl">
                  <span className="text-black">Token</span>
                </div>
                <br />
                {"Hub"}
              </h1>
              <h2 className=" text-2xl max-w-[500px] mb-9 text-white/80">
              Web3 Your Comic, Share with the World!!!
              </h2>

              {/*boton */}

              
            </div>

            {/*NFT */}
            <div className="w-full max-w-3xl mx-auto">
              <NftCards />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default App;
