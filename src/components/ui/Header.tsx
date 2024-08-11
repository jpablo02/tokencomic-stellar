import Link from "next/link";
import { Button } from "./button";
//components

import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-4 xl:py-6 text-white bg-accent">
      <div className="container mx-auto flex justify-between items-center">
        {/*logo*/}
        <Link href="/">
        
          <h1 className="text-4xl font-semibold">
          <span className="text-black">.</span>
            PetSafe<span className="text-yellow-400">.</span>
          </h1>
        </Link>

        

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
