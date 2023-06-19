"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { signOut, useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const isMobile = useMediaQuery("(max-width:800px)");
  const navElements = isLoggedIn ? (
    <>
      <button
        className='text-red-300 hover:text-red-400'
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        SignOut
      </button>
      <Link href='https://lnmdocs.vercel.app/' target='__blank'>
        <div className='hover:text-violet-100 font-semibold text-lg hover:bg-violet-400 py-1 px-3 rounded hover:bg-transparent text-violet-400'>
          LNMDocs
        </div>
      </Link>
    </>
  ) : (
    <>
      <Link href={`/login`}>
        <div className=' text-lg hover:text-white text-gray-400'>Login</div>
      </Link>
      <Link href={`/register`}>
        <div className=' text-lg hover:text-white text-gray-400'>Register</div>
      </Link>
      <Link href='https://lnmdocs.vercel.app/' target='__blank'>
        <div className='hover:text-violet-100 font-semibold text-lg hover:bg-violet-400 py-1 px-3 rounded hover:bg-transparent text-violet-400'>
          LNMDocs
        </div>
      </Link>
    </>
  );
  return (
    <div
      className={`h-16 w-full ${poppins.className} flex ${
        isMobile
          ? "flex-col justify-center h-32"
          : " flex-row justify-between  mt-6 fixed"
      } items-center text-white `}
    >
      <div
        className={` ${
          isMobile ? "w-full  pb-4" : "w-1/2"
        } text-2xl text-center font-semibold`}
      >
        LNMDocs Admin
      </div>

      <div
        className={`flex ${
          isMobile
            ? "w-full justify-around border-2 p-4"
            : "w-1/2 flex-1 gap-20 items-center justify-center"
        }`}
      >
        {navElements}
      </div>
    </div>
  );
};

export default Navbar;
