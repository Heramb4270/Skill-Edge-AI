// "use  client"
// import { MdPhishing } from "react-icons/md";
// import { PiPasswordFill } from "react-icons/pi";
// import { AiOutlineFileProtect } from "react-icons/ai";
// import { MdPeopleAlt } from "react-icons/md";
// import { GoReport } from "react-icons/go";
// import { FaNetworkWired } from "react-icons/fa6";
// import SideBar from "@/components/SideBar/SideBar";
// import SideBar from "@/components/admin/SideBar";
// import { useState } from "react";
// import Ecommerce from "@/components/Ecommerce";

export default function RootLayout({ children }) {
  return (
    <>
      <div class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {/* <NavBar /> */}
      </div>

      {/* <SideBar /> */}

      <div class="p-4 sm:ml-64 bg-gray-100 dark:bg-gray-800">
        <div class="p-4 mt-20 bg-white rounded-lg dark:bg-gray-900">
          {children}
        </div>
      </div>
    </>
  );
}
