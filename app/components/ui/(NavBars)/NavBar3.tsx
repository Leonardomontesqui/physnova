"use client";
import React from "react";

export default function NavBar() {
  const backToHome = () => {
    window.location.href = "/home";
  };
  return (
    <header className="sticky top-0 z-50 h-fit w-full px-[16px] lg:px-[200px] py-[8px] flex justify-between border border-b-[#dedede] bg-white items-center">
      <h1 className="font-semibold text-[20px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
        PhysNova
      </h1>
      <div className="flex gap-[16px]">
        <button
          className="text-[14px] px-[16px] py-[8px] border border-[#eeeeee] rounded-xl"
          onClick={backToHome}
        >
          Exit
        </button>
      </div>
    </header>
  );
}
