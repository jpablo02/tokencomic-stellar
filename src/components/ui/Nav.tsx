"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { ConnectButtons } from "./ConectButtons";

const links = [
  {
    name: "save the animal world with blockchain",
    path: "/about",
  },
];

const Nav = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex gap-8 items-center">
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

      <ConnectButtons />
    </nav>
  );
};

export default Nav;
