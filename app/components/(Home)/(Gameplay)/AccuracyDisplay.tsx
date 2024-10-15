"use client";
import React, { useEffect, useState } from "react";
import RoundedContainer from "../../(Shared)/RoundedContainer";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Bookmark, MonitorDot, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchAccuracy } from "@/lib/hooks/user";

interface Gameplay {
  accurate: number;
}

const supabase = supabaseBrowser();

export default function AccuracyDisplay() {
  const [accuracy, setAccuracy] = useState<number>();
  const [questionAmount, setQuestionAmount] = useState<number>(5);

  const router = useRouter();

  useEffect(() => {
    setGameplayData();
  }, []);

  const setGameplayData = async () => {
    const gameplay = await fetchAccuracy();
    setAccuracy(gameplay?.accurate);
    setQuestionAmount(gameplay?.number_of_questions);
  };

  return (
    <RoundedContainer className="bg-[#4356ff] border border-[#d0d4fe] flex flex-col w-full ">
      <p className="text-white text-opacity-80 ">Accuracy</p>
      <div className="flex flex-row gap-2">
        <Target size={35} strokeWidth={1.5} className="text-white" />
        <h1 className="text-white text-[24px]">
          {accuracy}/{questionAmount}
        </h1>
      </div>
    </RoundedContainer>
  );
}
