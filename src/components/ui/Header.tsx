import Link from "next/link";
import { Button } from "./button";
const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white bg-pink-50/20">
      <div className="container mx-auto">
        {/*logo*/}
        <Link href="/src/public/drum.png">
          <h1 className="text 4-xl font-semibold">
            Pablodrum <span className="text-accent-DEFALUT">.</span>
          </h1>
        </Link>
        {/*dektop nav*/}


      </div>
    </header>
  );
};

export default Header;
