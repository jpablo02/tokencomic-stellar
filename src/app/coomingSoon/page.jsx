import { Link } from "lucide-react";
import React from "react";

const about = () => {
  return (
    <section className="h-full bg-[#1E293B] justify-center ">
      <div className="container mx-auto h-full ">
        <div className="bg-[#1E293B] flex flex-col xl:flex-row items-center justify-center xl:pt-6 xl:pb-6 ">
          {/*text */}
          <div className="text-center xl:text-center order-1 xl:order-none pr-0 pt-4 text-2xl">
            <h1 className="h1 mb-4 items-center">
              <div className="bg-[#f58240] inline-block rounded-2xl items-center">
                <span className="text-black items-center">Coming</span>
              </div>
              <br />
              {"Soon"}
            </h1>
            <h2 className=" text-2xl max-w-[500px] mb-9 text-white/80">
              Working to Grow up!!!
            </h2>

            {/*boton */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default about;
