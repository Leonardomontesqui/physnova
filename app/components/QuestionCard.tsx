"use client";
import React, { useState, useEffect } from "react";
import { questionList } from "../questionList";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
const supabase = supabaseBrowser(); // this makes it a variable for all

export default function QuestionCard() {
  //React Hooks and variables at the top
  const [currentIndexSet, setCurrentIndexSet] = useState<number[]>([]); // Track used question indices
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
    //function when game finishes
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
        question_index_list: currentIndexSet,
      });

    if (gameplayInsertError) {
      console.error("Error inserting gameplay data");
    }
  };

  const getNextUniqueIndex = () => {
    let newIndex;
    do {
      // newIndex = questionList.length - 1; // for testing purposes!!!!!!!!!!
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
    <div className="min-h-full h-full w-full border rounded-3xl bg-white flex flex-col px-[64px] py-[20px] gap-[16px]">
      <div className="text-[#bfbfbf] text-[14px]">
        {currentIndexSet.length - 1} of 5
      </div>
      <div className="flex flex-col gap-[16px] h-full">
        <div>
          {currentQuestion?.Question && (
            <ReactMarkdown
              children={currentQuestion.Question}
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
            />
          )}
        </div>

        {currentQuestion?.Image && (
          <img
            className="mx-auto max-h-[200px]"
            src={currentQuestion.Image}
            alt="Image Related to Question"
          />
        )}
      </div>
      <div className="flex flex-col gap-[8px] ">
        {currentQuestion?.Options &&
          currentQuestion?.Options.slice()
            .sort(() => Math.random() - 0.5)
            .map((option) => (
              <button
                key={option.text}
                className="border rounded-lg px-[16px] py-[8px] text-left hover:bg-[#f7f7f7] after:bg-[#4356ff]"
                onClick={() => handleOptionClick(option)} // Pass the option object
              >
                <ReactMarkdown
                  children={option.text}
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                />
              </button>
            ))}
      </div>
    </div>
  );
}
