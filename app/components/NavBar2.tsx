import React from "react";
import SignOut from "./SignOut";

export default function NavBar() {
  return (
    <div className="w-full px-[40px] py-[20px] flex justify-between border border-b-[#dedede]">
      <div className="font-semibold text-[26.43px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
        PhysNova
      </div>
      <div className="flex gap-[16px]">
        <SignOut />
      </div>
    </div>
  );
}
