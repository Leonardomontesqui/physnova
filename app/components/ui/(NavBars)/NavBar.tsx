import React from "react";

export default function NavBar() {
  return (
    <header className=" z-50 sticky top-0 w-full px-[16px] lg:px-[200px] py-[8px] flex justify-between border border-b-[#dedede] items-center bg-white">
      <div className="font-semibold text-[20px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
        PhysNova
      </div>
      <div className="flex gap-[16px]">
        <a
          href="mailto: leo.mq06@gmail.com"
          className="text-[14px] px-[16px] py-[8px] border border-[#eeeeee] rounded-xl"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
