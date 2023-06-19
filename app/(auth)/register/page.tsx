// This is the /register route

import Register from "@/app/(auth)/register/Register";

export default function RegisterPage() {
  return (
    <div className='h-screen w-screen bg-dark flex justify-start items-center flex-col gap-9'>
      <Register />
    </div>
  );
}
