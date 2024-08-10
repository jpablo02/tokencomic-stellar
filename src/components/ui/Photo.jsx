"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full absolute">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
      >
        <motion.svg
          className="w-[400px] xl:w-[506px] h-[400px] xl:h-[506px] xl:pr-20 absolute"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        ></motion.svg>

        <motion.div
          className="w-[400px] h-[400px] xl:w-[506px] xl:h-[506px] mix-blend-lighten xl:pr-20 relative"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
          }}
        >
          <div className="card bg-base-100 w-full max-w-md shadow-xl mx-auto mb-4">
            <Image
              src="http://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmZZF8tSNEbijgtKc3nyV2zMDXysdid3Joakkyuo7H1nac"
              // className="w-full h-auto"
              priority
              quality={100}
              width={506}
              height={506}
              alt="Description of image"
              className="object-contain"
            />

            <div className="card-body">
              <h2 className="card-title">Fortune Cookie</h2>
              <p>Take one daily</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Break a Cookie</button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;
