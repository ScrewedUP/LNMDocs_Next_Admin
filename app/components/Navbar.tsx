'use client'
import  {useMediaQuery}  from "@/app/hooks/useMediaQuery";
const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:800px)");
  return (
    <div className={`h-16 w-full flex ${isMobile? "flex-col justify-center h-32" : "flex-row justify-evenly"} items-center text-white `}>
      <div className={`${isMobile? "w-full text-center pb-4 " : "pl-20 w-1/2"}  text-2xl font-mono`}>LNMDocs Admin</div>
      
      <div className={`flex ${isMobile ? "w-full justify-around border-2 p-4" : "pr-40 w-full flex-1 justify-evenly"}`}>
        <div className="font-mono text-lg text-gray-400">Login</div>
        <div className="font-mono text-gray-400 text-lg">Register</div>
        <div className="bg-green-500 p-1 rounded">
        <div className="text-black font-mono text-lg">LNMDocs</div></div>
      </div>
    </div>
  );
};

export default Navbar;
