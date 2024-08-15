import Link from "next/link";
import { Button } from "./button";
//components

import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <section>
      <header className="py-4 xl:py-6 text-white  relative z-40">
        <div className="container mx-auto flex justify-between  items-center">
          {/*logo*/}
          <Link href="/">
          <div className="  flex  items-center">
            <img
              src="https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmXkcpjzj9TqkNy1prxvtSnNrZVyQq6qpwSGgNHqReizMK/Designer1.png"
              className="w-24 h-auto"
              alt="Logo"
            />
                      
              <h1 className="text-4xl font-semibold ml-0">
                <span className="text-black">.</span>
                <span className="text-orange-500">.</span>
              </h1>
          </div>
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
    </section>
  );
};

export default Header;
