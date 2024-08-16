import { Link } from "lucide-react";
import React from "react";

const about = () => {
  return (
    <section className="col-span-1">
      <div className="text-center xl:text-center order-2 xl:order-none pr-0">
        <h1 className="h1 mb-4">
          <div className="bg-orange-400 inline-block rounded-2xl">
            <span className="text-black">Coming</span>
          </div>

          <br />
          {"Soon"}
        </h1>
      </div>

      <div className="text-center xl:text-center order-2 xl:order-none pr-0">
        <h2 className=" text-center text-2xl max-w-[500px] mb-9 text-white/80">
          We are working to grow our community!!!
        </h2>
      </div>
    </section>
  );
};

export default about;
