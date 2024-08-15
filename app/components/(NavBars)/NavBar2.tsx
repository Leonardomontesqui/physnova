import React from "react";
import SignOut from "../(Shared)/SignOut";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-white w-full px-[16px] lg:px-[200px] py-[8px] flex justify-between border border-b-[#dedede] items-center">
      <h1 className="font-semibold text-[20px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
        PhysNova
      </h1>
      <div className="flex gap-[8px]">
        <a
          href="mailto: leo.mq06@gmail.com"
          className="text-[14px] px-[16px] py-[8px] border border-[#eeeeee] rounded-xl"
        >
          Contact
        </a>
        <SignOut />
      </div>
    </header>
  );
}
