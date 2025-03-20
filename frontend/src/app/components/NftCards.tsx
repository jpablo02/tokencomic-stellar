import Link from "next/link";
import Image from "next/image";
import AnimatedCircle from "./AnimatedCircle"; // Ajusta la ruta según sea necesario

const images = [
  {
    src: "https://bafybeihie6nphrd275hp4pxi5pubwrmbkanpgocnhnfmu7zp6bcemragae.ipfs.dweb.link/7.png",
    title: "The suspended",
    path: "/suspended"
  },
  {
    src: "https://bafybeifypdd6ffmryu6mbcofzkj5su7gobqorya3deq7umxlmxouihnbwa.ipfs.dweb.link/callouscomics.png",
    title: "Callous",
    path: "/coomingSoon"
  },
  {
    src: "https://bafybeifypdd6ffmryu6mbcofzkj5su7gobqorya3deq7umxlmxouihnbwa.ipfs.dweb.link/peppercarrot.png",
    
    title: "Pepper carrot",
    path: "/coomingSoon"
  },
  {
    src: "https://bafybeifypdd6ffmryu6mbcofzkj5su7gobqorya3deq7umxlmxouihnbwa.ipfs.dweb.link/lifeinaggro.png",
    title: "Life in aggro",
    path: "/coomingSoon"
  },
  {
    src: "https://bafybeifypdd6ffmryu6mbcofzkj5su7gobqorya3deq7umxlmxouihnbwa.ipfs.dweb.link/dieselsweeties.png",
    title: "Diesel sweeties",
    path: "/coomingSoon"
  },
  // {
  //   src: "https://bafybeifypdd6ffmryu6mbcofzkj5su7gobqorya3deq7umxlmxouihnbwa.ipfs.dweb.link/poorlydrawnlines.png",
  //   title: "Poor drawnlines",
  //   path: "/chapter5"
  // }
];

const MenuPage = () => {
  return (
    <div className="order-2">
      <AnimatedCircle className="absolute inset-0 z-0 w-full h-full" />
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {images.map((image, index) => (
            <Link key={index} href={image.path} className="relative group block">
              <Image
                src={image.src}
                width={600}
                height={400}
                alt={image.title}
                className="object-cover w-full h-64 rounded-lg"
                layout="responsive"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-90 text-2xl p-2 text-center rounded-b-lg hover:bg-orange-400 hover:text-black transition-colors duration-300">
  {image.title}
</div>

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
