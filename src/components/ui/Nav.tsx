"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { ConnectButtons } from "./ConectButtons";



const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8 items-center">
      

      <ConnectButtons />
    </nav>
  );
};

export default Nav;