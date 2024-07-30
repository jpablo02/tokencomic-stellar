"use client";

import{Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'
import link from "next/link"
import{CiMenuFries}from "react-icons/ci";
import path from 'path';

const links =[
    {
        name: "Home",
        path:"/"
    },
    {
        name: "services",
        path:"/services"
    },
    {
        name: "resume",
        path:"/resume"
    },
    {
        name: "work",
        path:"/work"
    },
    {
        name: "contact",
        path:"/contact"
    },
]

const MobileNav = () => {

    const pathname = usePathname();
  return <Sheet>
    <SheetTrigger className='flex justify-center'>
        <CiMenuFries className='text-[32px] text-accent-DEFALUT' />
    </SheetTrigger>
    <SheetContent className='flex flex-col'>

        {/*Logo*/}
        <div>logo</div>
    </SheetContent>

  </Sheet>;
  
};

export default MobileNav