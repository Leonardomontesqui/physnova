"use client";
import React, { useState, useEffect } from "react";
import { questionList } from "../questionList";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function QuestionCard() {
  interface user {
    id: string;
    user_metadata: {
      name: string;
    };
  }
  const [currentIndexSet, setCurrentIndexSet] = useState<Set<number>>(
    new Set()
  ); // Track used question indices using a Set
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Current question index
  const [counter, setCounter] = useState(1); // Start counter at 1 (overall question counter)
  const [correctAnswers, setCorrectAnswers] = useState(0); // Counter for correct answers
  const [userData, setUserData] = useState<user | null>(null);
  const [isQuizDone, setIsQuizDone] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = supabaseBrowser();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        console.log("user fetched");
        setUserData(user);
      }
      if (error) {
        console.log("Error fetching user");
      }

      if (!user) {
        window.location.href = "/";
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (currentIndex === null) {
      getNextUniqueIndex();
    }
  }, [currentIndex]); // Update only when currentIndex changes

  useEffect(() => {
    const insertGameplayData = async () => {
      const supabase = supabaseBrowser();
      const { error } = await supabase.from("gameplay").insert({
        accurate: correctAnswers,
        name: userData.user_metadata.name,
      });
    };
    if (isQuizDone) {
      insertGameplayData();
    }
  }, [isQuizDone]);

  const getNextUniqueIndex = () => {
    const availableIndices = questionList
      .map((_, index) => index)
      .filter((index) => !currentIndexSet.has(index)); // Filter out used indices
    if (availableIndices.length === 0) {
      // Handle no more unique questions (optional: reset or display message)
      console.warn("No more unique questions available.");
      return;
    }
    const newIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setCurrentIndexSet(new Set([...currentIndexSet, newIndex]));
    setCurrentIndex(newIndex);
  };

  const handleOptionClick = async (option: any) => {
    // Pass the clicked option object
    if (counter < 5) {
      if (option.isCorrect) {
        // Check if the clicked option is correct
        setCorrectAnswers(correctAnswers + 1);
      }
      getNextUniqueIndex();
      setCounter(counter + 1);
    } else {
      if (option.isCorrect) {
        // Check if the clicked option is correct
        setCorrectAnswers(correctAnswers + 1);
      }
      // Handle reaching the end of the quiz
      setIsQuizDone(true);
      // console.log("counter value: " + counter);
      window.location.href = "/home";
    }
  };

  // console.log("correct answers value: " + correctAnswers);
  const currentQuestion =
    currentIndex !== null ? questionList[currentIndex] : null;

  return (
    <div className="h-full w-full border rounded-3xl bg-white flex flex-col px-[60px] py-[40px] justify-between">
      <div className="flex flex-col gap-[32px]">
        <div className="text-[#bfbfbf]">{counter} of 5</div>
        <div className="">{currentQuestion?.Question}</div>{" "}
        {/* Optional chaining */}
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
