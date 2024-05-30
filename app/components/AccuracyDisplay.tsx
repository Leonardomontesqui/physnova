import React, { useEffect, useState } from "react";
import RoundedContainer from "./RoundedContainer";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { ChevronRight } from "lucide-react";

export default function AccuracyDisplay() {
  interface User {
    id: string;
  }

  interface Gameplay {
    accurate: number;
  }

  const [userData, setUserData] = useState<User | null>(null);
  const [gameplayData, setGameplayData] = useState<Gameplay[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = supabaseBrowser();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setUserData(user);
        console.log("User was fetched jit:", user);
      }
      if (error) {
        console.log("Error fetching user");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchLatestAccuracy = async () => {
      const supabase = supabaseBrowser();
      if (userData) {
        const { data, error } = await supabase
          .from("gameplay")
          .select("accurate")
          .eq("user_id", userData.id);
        if (data) {
          setGameplayData(data);
          console.log("This is the gameplay data:", data);
        } else if (error) {
          console.log("Error fetching gameplay data");
        }
      }
    };

    fetchLatestAccuracy();
  }, [userData]);

  // Calculate the total accurate answers and total questions
  const totalAccurate =
    gameplayData?.reduce((sum, game) => sum + game.accurate, 0) || 0;
  const totalQuestions = gameplayData?.length * 5 || 0;
  const totalIncorrect = totalQuestions - totalAccurate;

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[8px]">
        <div className="w-full h-[1px] bg-[#dedede]" />
        <p className="">Latest</p>
        <div className="w-full h-[1px] bg-[#dedede]" />
      </div>
      <RoundedContainer>
        Accuracy:{" "}
        {gameplayData && gameplayData[gameplayData.length - 1]?.accurate}/5
      </RoundedContainer>
      <div className="flex items-center gap-[8px]">
        <div className="w-full h-[1px] bg-[#dedede]" />
        <p className="">Overall</p>
        <div className="w-full h-[1px] bg-[#dedede]" />
      </div>
      <RoundedContainer>Questions Seen: {totalQuestions}</RoundedContainer>
      <div className="flex gap-[16px]">
        <RoundedContainer>Answered Correctly: {totalAccurate}</RoundedContainer>
        <RoundedContainer className="flex items-center">
          Answered Incorrectly: {totalIncorrect}
        </RoundedContainer>
      </div>
    </div>
  );
}
