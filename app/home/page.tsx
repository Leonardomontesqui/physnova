"use client";
import React from "react";
import NavBar2 from "../components/NavBar2";
import RoundedContainer from "../components/RoundedContainer";
import ProfileHeader from "../components/ProfileHeader.1";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/router";
import AccuracyDisplay from "../components/AccuracyDisplay";

export default function Home() {
  const handlePlayClick = () => {
    window.location.href = "/question";
  };

  return (
    <main className="flex flex-col w-dvh h-dvh">
      <NavBar2 />
      <div className="border h-full bg-[#f6f7fb] flex px-[80px] py-[32px] gap-[32px]">
        <div className="w-full h-full bg-white rounded-3xl border border-[#d9d9d9] p-[40px] flex flex-col justify-between">
          <ProfileHeader />
          <AccuracyDisplay />
          <button
            className="px-[16px] py-[8px] bg-[#4356ff] rounded-xl border border-[#d0d4fe] self-center text-white"
            onClick={handlePlayClick}
          >
            Play
          </button>
        </div>
      </div>
    </main>
  );
}
