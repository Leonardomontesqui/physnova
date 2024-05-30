"use client";
import React from "react";

export default function NavBar() {
  const backToHome = () => {
    window.location.href = "/home";
  };
  return (
    <div className="w-full px-[40px] py-[20px] flex justify-between border border-b-[#dedede]">
      <div className="font-semibold text-[26.43px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
        PhysNova
      </div>
      <div className="flex gap-[16px]">
        <button
          className="text-[14px] px-[16px] py-[8px] border border-[#eeeeee] rounded-xl"
          onClick={backToHome}
        >
          Exit
        </button>
      </div>
    </div>
  );
}
