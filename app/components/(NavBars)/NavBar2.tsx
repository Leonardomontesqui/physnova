import React from "react";
import SignOut from "../SignOut";

export default function NavBar() {
  return (
    <div className="w-full px-[200px] py-[8px] flex justify-between border border-b-[#dedede] items-center">
      <div className="font-semibold text-[20px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
        PhysNova
      </div>
      <div className="flex gap-[8px]">
        <a
          href="mailto: leo.mq06@gmail.com"
          className="text-[14px] px-[16px] py-[8px] border border-[#eeeeee] rounded-xl"
        >
          Contact
        </a>
        <SignOut />
      </div>
    </div>
  );
}
