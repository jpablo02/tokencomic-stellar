"use client";

import React from "react";
import { MintNft1 } from "../components/mint-nft1";
import NftCards1 from "../components/NftCards1";
import path from "path";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { button } from "../components/button.tsx";

function App() {
 
  const pathname = usePathname();

  return (
    <section className="justify-between">
      <section className="h-full bg-[#1E293B] justify-between ">
        <div className="container mx-auto h-full ">
          <div className="bg-[#1E293B] flex flex-col xl:flex-row items-center justify-between xl:pt-6 xl:pb-6 ">
            {/*text */}

            <div className="text-center col-auto xl:text-left order-2 xl:order-none pr-0 z-20">
              <Link href="/suspended" className="">
                <div className="flex items-center  col-span-1 hover:scale-110   hover:shadow-lg hover:shadow-orange-500/50">
                  <img
                    src="https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmXkcpjzj9TqkNy1prxvtSnNrZVyQq6qpwSGgNHqReizMK/Designer1.png"
                    className="w-24 h-auto"
                    alt="Logo"
                  />
                  <h1 className="text-4xl font-semibold ml-0">
                    <span className="text-black">.</span>
                    <span className="hover:text-orange-500 transition-colors duration-300 ease-in-out">
                      The suspended
                    </span>
                    <span className="text-orange-500">.</span>
                  </h1>
                </div>
              </Link>

              <h2 className=" text-2xl max-w-[500px] mb-9 text-white/80">
                Chapter 1
              </h2>

              {/*boton */}
            </div>

            {/*NFT */}
            <div className="w-full max-w-3xl mx-auto">
              <NftCards1 />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default App;
