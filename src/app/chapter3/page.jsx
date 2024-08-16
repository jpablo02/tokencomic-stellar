"use client";

import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MintNFT } from "../../app/mint-nft";
import NftCards3 from "../../components/ui/NftCards3";
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

            <div className="text-center xl:text-left order-2 xl:order-none pr-0 z-20">
              <Link href="/suspended">
                <div className="flex items-center hover:scale-110">
                  <img
                    src="https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmXkcpjzj9TqkNy1prxvtSnNrZVyQq6qpwSGgNHqReizMK/Designer1.png"
                    className="w-24 h-auto"
                    alt="Logo"
                  />

                  <h1 className="text-4xl font-semibold ml-0">
                    <span className="text-black">.</span>
                    <span>The suspended</span>
                    <span className="text-orange-500">.</span>
                  </h1>
                </div>
              </Link>
              <h2 className=" text-2xl max-w-[500px] mb-9 text-white/80">
              Chapter 3
              </h2>

              {/*boton */}
            </div>

            {/*NFT */}
            <div className="w-full max-w-3xl mx-auto">
              <NftCards3 />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default App;
