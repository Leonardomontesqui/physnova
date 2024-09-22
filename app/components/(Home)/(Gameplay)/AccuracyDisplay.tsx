"use client";
import React, { useEffect, useState } from "react";
import RoundedContainer from "../../(Shared)/RoundedContainer";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Bookmark, MonitorDot, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Gameplay {
  accurate: number;
}

const supabase = supabaseBrowser();

export default function AccuracyDisplay() {
  const [gameplayData, setGameplayData] = useState<Gameplay[]>([]);

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
    <RoundedContainer className="bg-[#4356ff] border border-[#d0d4fe] flex flex-col w-full ">
      <p className="text-white text-opacity-80 ">Accuracy</p>
      <div className="flex flex-row gap-2">
        <Target size={35} strokeWidth={1.5} className="text-white" />
        <h1 className="text-white text-[24px]">
          {gameplayData && gameplayData[gameplayData.length - 1]?.accurate}
          /5
        </h1>
      </div>
    </RoundedContainer>
  );
}
