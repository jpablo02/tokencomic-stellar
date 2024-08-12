import Link from "next/link";
import { Button } from "./button";
//components

import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-4 xl:py-6 text-white bg-accent">
      <div className="container mx-auto flex justify-between  items-center">
        {/*logo*/}
        <div className="   flex  items-center">
          <img
            src="https://bafybeihv6rzseuad62u67gtsihwwlx6mhia22cxudc3i7xia4gka4mzaxi.ipfs.dweb.link/9.png"
            className="w-24 h-auto"
            alt="Logo mr-0"
          />
          <Link href="/">
            <h1 className="text-4xl font-semibold ml-0">
              <span className="text-black">.</span>
              Suspended<span className="text-orange-500">.</span>
            </h1>
          </Link>
        </div>

        {/*dektop nav*/}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>
        {/*mobile nav*/}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
