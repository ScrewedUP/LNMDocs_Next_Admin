// This is the / route.

"use client";

import Login from "./(auth)/login/Login";
import { useSession } from "next-auth/react";
import UploadForm from "./UploadForm";

export default function HomePage() {
  const session = useSession();
  console.log(session);
  const isLoggedIn = session.status === "authenticated";

  return (
    <div className='h-screen w-full bg-dark flex justify-center items-center flex-col gap-9'>
      {!isLoggedIn && <Login />}
      {isLoggedIn && (
        <div>
          <UploadForm />
        </div>
      )}
    </div>
  );
}
