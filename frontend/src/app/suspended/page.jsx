"use client";

import React from "react";


import NftCardsSuspended from "../components/NftCardsSuspended";
import path from "path";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { button } from "../components/button";

function App() {
  
  const pathname = usePathname();

  return (
    <section className="justify-between ">
      <section className="h-full bg-[#1E293B] justify-between ">
        <div className="container mx-auto h-full ">
          <div className="bg-[#1E293B] flex flex-col xl:flex-row items-center justify-between xl:pt-6 xl:pb-6 ">
            {/*text */}

            <div className="text-center xl:text-left order-2 xl:order-none pr-0">
              <Link href="/">
                <div className="  flex  items-center">
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
                A story that mixes science fiction, reality and collectibles nft 

              </h2>

              {/*boton */}
            </div>

            {/*NFT */}
            <div className="w-full max-w-3xl mx-auto">
              <NftCardsSuspended />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default App;
