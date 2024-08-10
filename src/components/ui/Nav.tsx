"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { ConnectButtons } from "./ConectButtons";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const Nav = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${link.path === pathname && "text-accent-DEFALUT border-b-2 border-accent-DEFALUT"}
              capitalize font-medium hover:text-accent-DEFALUT transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
      <ConnectButtons />

      
    </nav>
  );
};

export default Nav;
