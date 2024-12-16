import React from "react";

export default function NavBar({ sticky }: { sticky?: boolean }) {
  return (
    <header
      className={`${
        sticky ? "z-50 sticky top-0" : null
      } w-full px-[16px] lg:px-[200px] py-[8px] flex justify-between border border-b-[#dedede] items-center bg-white`}
    >
      <p className="font-semibold text-[20px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
        PhysNova
      </p>
      <div className="flex gap-4">{}</div>
    </header>
  );
}
