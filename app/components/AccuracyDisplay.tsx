import React, { useEffect, useState } from "react";
import RoundedContainer from "./RoundedContainer";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { CircleCheck, CircleX, MonitorDot, Target } from "lucide-react";
import { useRouter } from "next/navigation";

interface Gameplay {
  accurate: number;
}

const supabase = supabaseBrowser();

export default function AccuracyDisplay() {
  const [gameplayData, setGameplayData] = useState<Gameplay[]>([]);
  const totalAccurate =
    gameplayData?.reduce((sum, game) => sum + game.accurate, 0) || 0;
  const GamesPlayed = gameplayData?.length;
  const totalIncorrect = GamesPlayed * 5 - totalAccurate;
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

  return (
    <div className="flex lg:flex-col gap-[8px] items-center">
      <RoundedContainer className="bg-[#4356ff] border border-[#d0d4fe] flex items-center">
        <Target size={35} strokeWidth={1.5} className="text-white" />
        <div className="flex flex-col">
          <div className="text-white text-opacity-80 text-[14px]">Accuracy</div>
          <div className="text-white text-[24px]">
            {gameplayData && gameplayData[gameplayData.length - 1]?.accurate}
            /5
          </div>
        </div>
      </RoundedContainer>
      <RoundedContainer className="flex items-center">
        <MonitorDot size={35} strokeWidth={1.5} className="text-[#dedede]" />
        <div className="flex flex-col">
          <div className="text-[#afadad] text-[14px]">Games Played</div>
          <div className="text-[20px]">{GamesPlayed}</div>
        </div>
      </RoundedContainer>
      <div className="gap-[8px] hidden lg:flex">
        <RoundedContainer className="flex items-center">
          <CircleCheck size={35} strokeWidth={1.5} className="text-[#dedede]" />
          <div className="flex flex-col">
            <div className="text-[#afadad] text-[14px]">Correctly Answered</div>
            <div className="text-[20px]">{totalAccurate}</div>
          </div>
        </RoundedContainer>
        <RoundedContainer className="flex items-center">
          <CircleX size={35} strokeWidth={1.5} className="text-[#dedede]" />
          <div className="flex flex-col">
            <div className="text-[#afadad] text-[14px]">
              Incorrectly Answered
            </div>
            <div className="text-[20px]">{totalIncorrect}</div>
          </div>
        </RoundedContainer>
      </div>
    </div>
  );
}
