import Link from "next/link";
import Image from "next/image";
import AnimatedCircle from "./AnimatedCircle"; // Ajusta la ruta según sea necesario

const images = [
  {
    src: "https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/1.jpg",
    title: "Chapter 1",
    path: "/chapter1"
  },
  {
    src: "https://gateway.lighthouse.storage/ipfs/bafybeih4g7jzd2e6cmyxtz7jvzhklrxdsyjchxgndtt7irdmupawo4gsrq/1.png",
    title: "Chapter 2",
    path: "/chapter2"
  },
  {
    src: "https://bafybeihaeqxsomey6atu77nvtqg7d7p6ycekstgweiostkwpknz6idujdi.ipfs.dweb.link/1.png",
    title: "Chapter 3",
    path: "/chapter3"
  },
  {
    src: "https://bafybeiexjn4b7ewg2a7embuyrfooxqk7nsbkds3chcbqdgxkz3gbbybmuq.ipfs.dweb.link/1.png",
    title: "Chapter 4",
    path: "/chapter4"
  },

  {
    src: "https://bafybeihie6nphrd275hp4pxi5pubwrmbkanpgocnhnfmu7zp6bcemragae.ipfs.dweb.link/1.png",
    title: "Chapter 5",
    path: "/chapter5"
  }
];

const MenuPage = () => {
  return (
    <div className="">
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
