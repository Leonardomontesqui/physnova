"use client";
import React, { useState, useEffect } from "react";
import { questionList } from "../questionList";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
const supabase = supabaseBrowser(); // this makes it a variable for all

export default function QuestionCard() {
  //React Hooks and variables at the top
  const [currentIndexSet, setCurrentIndexSet] = useState<number[]>([]); // Track used question indices using a Set
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Current question index
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // Counter for correct answers

  const currentQuestion =
    currentIndex !== null ? questionList[currentIndex] : null;
  const router = useRouter();

  useEffect(() => {
    // Get index on mount
    getNextUniqueIndex();
  }, []);

  const insertGamePlayData = async (isLastCorrect: boolean) => {
    const { data: userData, error: userDataError } =
      await supabase.auth.getUser();
    if (!userData || userDataError) {
      console.error("Error fetching user data");
      return;
    }

    const { error: gameplayInsertError } = await supabase
      .from("gameplay")
      .insert({
        accurate: correctAnswers + Number(isLastCorrect),
        name: userData.user.user_metadata.name,
      });

    if (gameplayInsertError) {
      console.error("Error inserting gameplay data");
    }
  };

  const getNextUniqueIndex = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * questionList.length);
    } while (currentIndexSet.includes(newIndex));

    setCurrentIndexSet((prev) => [...prev, newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleOptionClick = async (option: any) => {
    // Pass the clicked option object
    if (option.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentIndexSet.length <= 5) {
      getNextUniqueIndex();
    } else {
      insertGamePlayData(option.isCorrect as boolean);
      router.push("/home");
    }
  };

  return (
    <div className="h-full w-full border rounded-3xl bg-white flex flex-col px-[60px] py-[40px] justify-between">
      <div className="flex flex-col gap-[32px]">
        <div className="text-[#bfbfbf]">{currentIndexSet.length - 1} of 5</div>
        <div className="">{currentQuestion?.Question}</div>{" "}
      </div>

      <div className="flex flex-col gap-[8px]">
        {currentQuestion?.Options &&
          currentQuestion?.Options.map((option) => (
            <button
              key={option.text}
              className="border rounded-lg px-[16px] py-[8px] text-left"
              onClick={() => handleOptionClick(option)} // Pass the option object
            >
              {option.text}
            </button>
          ))}
      </div>
    </div>
  );
}
