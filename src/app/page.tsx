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
    <section className="h-full bg-accent">
      <div className="container mx-auto h-full">
        <div className="bg-accent flex flex-col xl:flex-row items-center justify-between xl:pt-6 xl:pb-6">
          {/*text */}
          
            <div className="text-center xl:text-left order-2 xl:order-none pr-0">
              <span className="text-2xl top-30 left-0 ">WEB 3 FUNDATION</span>
              <h1 className="h1 mb-4">
                {"Pet"}
                <br />
                <div className="bg-yellow-500 inline-block rounded-2xl">
                  <span className="text-black">Safe</span>
                </div>
              </h1>
              <h2 className=" text-2xl max-w-[500px] mb-9 text-white/80">
                The first animal aid foundation based on NFTS
              </h2>
            

            {/*boton */}

            <Button className="uppercase flex items-center gap-2">
              {links.map((link, index) => {
                return (
                  <Link
                    href={link.path}
                    key={index}
                    className={`${link.path === pathname && " border-b-2 border-accent"}
              capitalize font-medium hover:text-black transition-all`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </Button>
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
