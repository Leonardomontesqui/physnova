"use client";
import React, { useState, useEffect } from "react";
import { questionList } from "../questionList";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";

const supabase = supabaseBrowser(); // this makes it a variable for all

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function QuestionCard() {
  const [questionIndexSet, setQuestionIndexSet] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [optionClickedIndex, setOptionClickedIndex] = useState<number[]>([]);
  const [shuffledOptionIndices, setShuffledOptionIndices] = useState<number[]>(
    []
  );

  const currentQuestion =
    currentIndex !== null ? questionList[currentIndex] : null;
  const router = useRouter();

  useEffect(() => {
    getNextUniqueIndex();
  }, []);

  useEffect(() => {
    if (currentQuestion?.Options) {
      setShuffledOptionIndices(shuffleArray([0, 1, 2, 3]));
    }
  }, [currentQuestion]);

  const getNextUniqueIndex = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * questionList.length);
    } while (questionIndexSet.includes(newIndex));

    setQuestionIndexSet((prev) => [...prev, newIndex]);
    setCurrentIndex(newIndex);
  };

  const insertGamePlayData = async (index: number, isLastCorrect: boolean) => {
    let updatedIndexSelect = optionClickedIndex;
    updatedIndexSelect.push(index);
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
        question_index_list: questionIndexSet,
        option_index_list: updatedIndexSelect,
      });

    if (gameplayInsertError) {
      console.error("Error inserting gameplay data");
    }
  };

  const handleOptionClick = async (index: number, option: any) => {
    // console.log("Index clicked: ", index);
    setOptionClickedIndex((prev) => [...prev, index]);

    if (option.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (questionIndexSet.length <= 5) {
      getNextUniqueIndex();
    } else {
      insertGamePlayData(index, option.isCorrect);
      router.push("/home");
    }
  };

  return (
    <div className="min-h-full h-full w-full border rounded-3xl bg-white flex flex-col px-[64px] py-[20px] gap-[16px]">
      <div className="text-[#bfbfbf] text-[14px]">
        {questionIndexSet.length - 1} of 5
      </div>
      <div className="flex flex-col gap-[16px] h-full">
        <div>
          {currentQuestion?.Question && (
            <ReactMarkdown
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
            >
              {currentQuestion.Question}
            </ReactMarkdown>
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
      <div className="flex flex-col gap-[8px]">
        {currentQuestion?.Options &&
          shuffledOptionIndices.map((shuffledIndex) => {
            const option = currentQuestion.Options[shuffledIndex];
            return (
              <button
                key={shuffledIndex}
                className="border rounded-lg px-[16px] py-[8px] text-left hover:bg-[#f7f7f7] after:bg-[#4356ff]"
                onClick={() => handleOptionClick(shuffledIndex, option)}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                >
                  {option.text}
                </ReactMarkdown>
              </button>
            );
          })}
      </div>
    </div>
  );
}
