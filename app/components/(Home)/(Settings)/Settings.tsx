"use client";
import React, { useState } from "react";
import TopicsBox from "./TopicsBox";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

const supabase = supabaseBrowser();

export function Settings() {
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
    <div className="h-full w-full bg-white rounded-3xl border border-[#d9d9d9] p-[24px] flex flex-col items-center gap-[8px]">
      <h1 className="font-medium">Select Topics</h1>
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
  );
}
