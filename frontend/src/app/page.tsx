"use client";
import Photo from "./components/Photo";
import React from "react";


import NftCards from "./components/NftCards";
import path from "path";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Header from "./components/Header";


function Home() {
  
  const pathname = usePathname();

  const links = [
    {
      name: "save the animal world with blockchain",
      path: "/about",
    },
  ];

  return (
    <section className="justify-between">
     <h1>HOLA</h1>
      <section className="h-full bg-[#1E293B] justify-between ">
        <div className="container mx-auto h-full ">
          <div className="bg-[#1E293B] flex flex-col xl:flex-row items-center justify-between xl:pt-6 xl:pb-6 ">
            {/*text */}

            <div className="text-center xl:text-left order-1 xl:order-none pr-0 pt-4 text-2xl">
            
             
              <h1 className="h1 mb-4">
              
              
                <div className="bg-[#f58240] inline-block rounded-2xl text-center items-center">
                  <span className="text-black ">Token</span>
                  
                </div>
                <br/>
                {"Comic"}
                
              </h1>
              <h2 className=" text-2xl max-w-[500px] mb-9 text-white/80">
                Web3 Your Comic, <br/> mint the World!!!
              </h2>

              {/*boton */}

              
            </div>

            {/*NFT */}
            <div className="w-full max-w-3xl mx-auto order-2">
              <NftCards />
            </div>
          </div>
        </div>
      </section>
      
    </section>
  );
}

export default Home;
