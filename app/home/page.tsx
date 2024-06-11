"use client";
import React, { useState } from "react";
import NavBar2 from "../components/NavBar2";
import RoundedContainer from "../components/RoundedContainer";
import ProfileHeader from "../components/ProfileHeader.1";
import { useRouter } from "next/navigation"; //FROM NEXT NAVIGATION
import AccuracyDisplay from "../components/AccuracyDisplay";
import QuestionCard from "../components/QuestionCard";
import CorrectAnswers from "../components/CorrectAnswers.1";

export default function Home() {
  const router = useRouter();

  const handlePlayClick = () => {
    router.push("/question");
  };

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  return (
    <main className="flex flex-col w-dvh h-screen">
      <NavBar2 />
      <div className="border min-h-0 h-full bg-[#f6f7fb] flex px-[200px] py-[32px] gap-[32px]">
        <div className="w-full h-full bg-white rounded-3xl border border-[#d9d9d9] p-[24px] flex flex-col items-center gap-[16px] basis-1/3">
          <div className="font-medium">Gameplay</div>
          <AccuracyDisplay />
          <button
            className="px-[16px] py-[8px] bg-white rounded-xl border-2 border-[#4356ff] self-center text-[#4356ff] text-[20px]"
            onClick={handlePlayClick}
          >
            Play
          </button>
        </div>
        <CorrectAnswers />
      </div>
    </main>
  );
}
