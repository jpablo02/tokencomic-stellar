"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { ConnectButtons } from "./ConectButtons";

const links = [
  
  // Nuevo link agregado aquí
  {
    name: "boton",
    path: "/boton",
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8 items-center">
      {/* Mapeamos todos los links */}
      {links.map((link) => {
        const isActive = pathname === link.path;
        
        return (
          <Link
            key={link.path}
            href={link.path}
            className={
              isActive 
                ? "text-blue-500 font-bold" 
                : "text-gray-500 hover:text-blue-400"
            }
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