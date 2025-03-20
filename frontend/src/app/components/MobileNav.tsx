"use client";

import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import path from "path";
import  ConnectButtons from "./Connectbuttons";

const links = [
  


  {
    name: "The suspended",
    path: "/suspended",
  },

  
  {
    name: "Callous",
    path: "/coomingSoon",
  },
  {
    name: "Pepper carrot",
    path: "/coomingSoon",
  },
  {
    name: "Life in aggro",
    path: "/coomingSoon",
  },
  {
    name: "Diesel sweeties",
    path: "/coomingSoon",
  },
  
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      
      <SheetContent className="flex flex-col">
        {/*Logo*/}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Token Hub<span className="text-accent">.</span>
              <div className="flex flex-col justify-center items-center gap-3">
              <ConnectButtons />
            </div>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-3">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${link.path === pathname && "text-accent border-b-2 border-accent"} text-xl capitalize hover:text-accent transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
    
  );
};

export default MobileNav;
