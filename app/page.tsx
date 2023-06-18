import { Poppins } from "next/font/google";

import Login from "./components/Login";

const page = () => {
  return (
    <div className='h-screen w-screen bg-black flex justify-start items-center flex-col gap-9'>
      <h1 className={` font-bold text-6xl text-white mt-10 `}>LNMDocs Admin</h1>
      <Login />
    </div>
  );
};

export default page;
