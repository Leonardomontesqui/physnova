import React from "react";
import Link from "next/link";

export default function NavBar({
  notSticky,
  children,
}: {
  notSticky?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <header
      className={`${
        notSticky ? null : "z-50 sticky top-0"
      } w-full px-[16px] lg:px-[200px] py-[8px] flex justify-between border border-b-[#dedede] items-center bg-white`}
    >
      <Link
        href="/"
        className="font-semibold text-[20px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent"
      >
        PhysNova
      </Link>
      <div className="flex gap-4">{children}</div>
    </header>
  );
}
