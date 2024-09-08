"use client";
import React, { useEffect, useState } from "react";
import RoundedContainer from "../../(Shared)/RoundedContainer";
import { supabaseBrowser } from "@/lib/supabase/browser";
import {
  Bookmark,
  CircleCheck,
  CircleX,
  MonitorDot,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Gameplay {
  accurate: number;
}

const supabase = supabaseBrowser();

export default function AccuracyDisplay() {
  const [gameplayData, setGameplayData] = useState<Gameplay[]>([]);
  const totalAccurate =
    gameplayData?.reduce((sum, game) => sum + game.accurate, 0) || 0;
  const GamesPlayed = gameplayData?.length;

  const router = useRouter();

  useEffect(() => {
    fetchLatestAccuracy();
  }, []);

  const fetchLatestAccuracy = async () => {
    const { data: userDataRes, error: userDataError } =
      await supabase.auth.getUser();

    if (!userDataRes || userDataError) {
      console.error("Error fetching user data or No user data was retrieved");
      router.push("/");
      return;
    }

    const { data: gameplayDataRes, error: gameplayDataError } = await supabase
      .from("gameplay")
      .select("accurate")
      .eq("user_id", userDataRes.user.id)
      .order("created_at", { ascending: true });

    if (!gameplayDataRes || gameplayDataError) {
      console.error("Error fetching gameplay data");
      return;
    }
    //console.log("Check out", gameplayDataRes);
    setGameplayData(gameplayDataRes);
  };

  const handleNavigation = () => {
    router.push("/bank");
  };

  return (
    <div className="flex lg:flex-col gap-[8px] items-center w-full">
      <RoundedContainer className="bg-[#4356ff] border border-[#d0d4fe] flex items-center w-full">
        <Target size={35} strokeWidth={1.5} className="text-white" />
        <div className="flex flex-col">
          <p className="text-white text-opacity-80 text-[14px]">Accuracy</p>
          <div className="text-white text-[24px]">
            {gameplayData && gameplayData[gameplayData.length - 1]?.accurate}
            /5
          </div>
        </div>
      </RoundedContainer>
      <RoundedContainer className="flex items-center">
        <MonitorDot size={35} strokeWidth={1.5} className="text-[#dedede]" />
        <div className="flex flex-col">
          <p className="text-[#afadad] text-[14px]">Games Played</p>
          <div className="text-[20px]">{GamesPlayed}</div>
        </div>
      </RoundedContainer>
      <RoundedContainer
        className="flex items-center w-full hover:bg-[#f3f3f3]"
        onClick={handleNavigation}
      >
        <Bookmark size={35} strokeWidth={1.5} className="text-[#dedede]" />
        <Link
          className="text-[#afadad] text-[14px] cursor cursor-default"
          href={"/bank"}
        >
          Saved Questions
        </Link>
      </RoundedContainer>
    </div>
  );
}
