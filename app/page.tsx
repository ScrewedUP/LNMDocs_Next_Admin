"use client";

import Login from "./(auth)/login/Login";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const session = useSession();
  console.log(session);
  const isLoggedIn = session.status === "authenticated";
  //session data retrieved from the server side
  return (
    <div className='h-screen w-screen bg-dark flex justify-start items-center flex-col gap-9'>
      {/* <h1 className={` font-bold text-6xl text-white mt-10 `}>LNMDocs Admin</h1> */}
      {isLoggedIn && (
        <div className='text-white text-4xl'>You are logged in</div>
      )}
      {<Login /> && !isLoggedIn}
    </div>
  );
}
