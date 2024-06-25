"use client";
import React, { useState } from "react";
import NavBar2 from "../components/NavBar2";
import RoundedContainer from "../components/RoundedContainer";
import { useRouter } from "next/navigation"; //FROM NEXT NAVIGATION
import AccuracyDisplay from "../components/AccuracyDisplay";
import QuestionCard from "../components/QuestionCard";
import CorrectAnswers from "../components/CorrectAnswers";
import TopicsBox from "../components/TopicsBox";
import { supabaseBrowser } from "@/lib/supabase/browser";

const supabase = supabaseBrowser();

export default function Home() {
  const [topicsChosen, setTopicsChosen] = useState<string[]>([]);
  const router = useRouter();

  const handlePlayClick = async () => {
    const { error: insertTopicsError } = await supabase
      .from("topics_chosen")
      .insert({ topics: topicsChosen });

    if (insertTopicsError) {
      console.error("Error inserting topics");
    }
    router.push("/question");
  };

  return (
    <main className="flex flex-col w-dvh h-screen">
      <NavBar2 />
      <div className="border min-h-0 h-full bg-[#f6f7fb] flex px-[200px] py-[32px] gap-[32px]">
        <div className="w-full h-full bg-white rounded-3xl border border-[#d9d9d9] p-[24px] flex flex-col items-center gap-[16px] basis-1/3">
          <div className="font-medium">Gameplay</div>
          <AccuracyDisplay />
          <div className="font-medium">Topics</div>
          <TopicsBox
            topicsChosen={topicsChosen}
            setTopicsChosen={setTopicsChosen}
          />
          <button
            className="px-[16px] py-[8px] bg-white rounded-xl border-2 border-[#4356ff] self-center text-[#4356ff] font-medium text-[16px]"
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
