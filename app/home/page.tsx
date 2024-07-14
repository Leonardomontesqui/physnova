"use client";
import React, { useState } from "react";
import NavBar2 from "../components/(NavBars)/NavBar2";
import { useRouter } from "next/navigation"; //FROM NEXT NAVIGATION
import AccuracyDisplay from "../components/AccuracyDisplay";
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
    <main className="flex flex-col w-dvh min-h-dvh lg:h-screen">
      <NavBar2 />
      <section className=" h-full lg:min-h-0 bg-[#f6f7fb] px-[16px] lg:px-[200px] py-[16px] lg:py-[32px] gap-[16px] lg:gap-[32px] lg:flex">
        <div className="flex flex-col basis-1/3 gap-[16px] lg:gap-[32px]">
          <div className="w-full h-full bg-white rounded-3xl border border-[#d9d9d9] p-[24px] flex flex-col items-center gap-[8px]">
            <div className="font-medium">Gameplay</div>
            <AccuracyDisplay />
          </div>
          <div className="h-full w-full bg-white rounded-3xl border border-[#d9d9d9] p-[24px] flex flex-col items-center gap-[8px]">
            <div className="font-medium">Select Topics</div>
            <TopicsBox
              topicsChosen={topicsChosen}
              setTopicsChosen={setTopicsChosen}
            />
            <div className="h-full flex flex-col justify-end">
              <button
                className="px-[16px] py-[8px] bg-white rounded-xl border-2 border-[#4356ff] self-center text-[#4356ff] font-medium text-[16px]"
                onClick={handlePlayClick}
              >
                Play
              </button>
            </div>
          </div>
        </div>
        <CorrectAnswers />
      </section>
    </main>
  );
}
