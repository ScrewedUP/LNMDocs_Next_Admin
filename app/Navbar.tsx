"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const isMobile = useMediaQuery("(max-width:800px)");
  return (
    <div
      className={`h-16 w-full flex ${
        isMobile ? "flex-col justify-center h-32" : "flex-row justify-evenly"
      } items-center text-white `}
    >
      <div
        className={`${
          isMobile ? "w-full text-center pb-4 " : "pl-20 w-1/2"
        }  text-2xl font-mono`}
      >
        LNMDocs Admin
      </div>

      <div
        className={`flex ${
          isMobile
            ? "w-full justify-around border-2 p-4"
            : "pr-40 w-full flex-1 justify-evenly"
        }`}
      >
        <Link href={`/login`}>
          <div className='font-mono text-lg text-gray-400'>Login</div>
        </Link>
        <Link href={`/register`}>
          <div className='font-mono text-lg text-gray-400'>Register</div>
        </Link>
        {isLoggedIn && (
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            SignOut
          </button>
        )}
        <Link href='https://lnmdocs.vercel.app/' target='__blank'>
          <div className='text-black font-mono text-lg bg-green-500 p-1 rounded'>
            LNMDocs
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
