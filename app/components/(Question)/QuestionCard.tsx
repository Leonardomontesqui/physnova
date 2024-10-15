"use client";
import React, { useState, useEffect } from "react";
import { questionList } from "../../../constants/questionList";
import { supabaseBrowser } from "@/lib/supabase/browser";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import { fetchSettings, insertGameplayData } from "@/lib/hooks/user";
import { ArrowBigRight } from "lucide-react";
import {
  generateFilteredIndexList,
  shuffleArray,
} from "@/lib/actions/filtering";

const supabase = supabaseBrowser(); // this makes it a variable for all
type QuestionType = (typeof questionList)[0];

export default function QuestionCard() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [optionClickedIndex, setOptionClickedIndex] = useState<number[]>([]);
  const [shuffledOptionIndices, setShuffledOptionIndices] = useState<number[]>(
    []
  );
  const [questionIndexes, setQuestionIndexes] = useState<number[]>([]);
  const [changeState, setChangeState] = useState<boolean>(false);
  const [clickedIndex, setClickedIndex] = useState<number>(9);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);

  useEffect(() => {
    applySettings();
    setShuffledOptionIndices(shuffleArray([0, 1, 2, 3]));
    // testingIndexList();
  }, []);

  useEffect(() => {
    setShuffledOptionIndices(shuffleArray([0, 1, 2, 3]));
  }, [currentIndex]);

  const applySettings = async () => {
    const settings = await fetchSettings();
    const questionAmount = settings?.number_of_questions;
    setNumberOfQuestions(questionAmount);

    const filteredQuestionIndexes = generateFilteredIndexList(settings);
    setQuestionIndexes(filteredQuestionIndexes);
  };

  const testingIndexList = () => {
    // Set originalIndexes to the last five indexes of questionList
    const lastFiveIndexes = questionList
      .slice(-5)
      .map((_, index) => questionList.length - 5 + index)
      .reverse();
    setQuestionIndexes(lastFiveIndexes);
  };

  const handleCheckAnswer = () => {
    const option =
      questionList[questionIndexes[currentIndex]].Options[clickedIndex];

    setOptionClickedIndex((prev) => [...prev, clickedIndex]);

    if (option.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setChangeState(true);
  };

  const handleNextQuestion = async () => {
    if (currentIndex < numberOfQuestions - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setChangeState(false);
      setClickedIndex(9);
    } else {
      await insertGameplayData(
        correctAnswers,
        questionIndexes,
        optionClickedIndex,
        numberOfQuestions
      );
      window.location.href = "/home";
    }
  };

  const getOptionColor = (index: number, isCorrect: boolean) => {
    if (index == clickedIndex) {
      return isCorrect
        ? "border-[#d2e9d8] bg-[#ecf8ef]"
        : "border-[#e7cccc] bg-[#fde2e2]";
    }
    if (isCorrect) {
      return "border-[#d2e9d8] bg-[#ecf8ef]";
    } else {
      return "border-[#e0e0e0]";
    }
  };

  return (
    <section className="relative h-full lg:max-w-[1080px] lg:min-w-[600px] md:border md:rounded-3xl bg-white flex flex-col px-[20px] py-[20px] border md:my-[40px] overflow-y-scroll no-scrollbar gap-2">
      <header className="text-[#bfbfbf] text-xs md:text-sm flex w-full justify-between">
        <p>
          {currentIndex + 1} of {numberOfQuestions}
        </p>
        <p>{questionList[questionIndexes[currentIndex]]?.Topic}</p>
      </header>

      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        className="text-sm md:text-base"
      >
        {questionList[questionIndexes[currentIndex]]?.Question}
      </ReactMarkdown>

      {questionList[questionIndexes[currentIndex]]?.Image && (
        <img
          className="mx-auto max-h-[250px]"
          src={questionList[questionIndexes[currentIndex]]?.Image}
          alt="Image Related to Question"
        />
      )}

      <section className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 items-center">
        {questionList[questionIndexes[currentIndex]]?.Options &&
          shuffledOptionIndices.map((shuffledIndex) => {
            const option =
              questionList[questionIndexes[currentIndex]].Options[
                shuffledIndex
              ];
            if (!changeState) {
              return (
                <button
                  key={shuffledIndex}
                  className={`border rounded-lg px-[16px] py-[8px] text-[14px] md:text-[16px] text-left md:hover:bg-[#f7f7f7] w-full ${
                    shuffledIndex == clickedIndex ? "bg-[#f1f1f1]" : ""
                  }`}
                  onClick={() => setClickedIndex(shuffledIndex)}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex, rehypeRaw]}
                  >
                    {option.text}
                  </ReactMarkdown>
                </button>
              );
            }
            return (
              <button
                key={shuffledIndex}
                className={`border rounded-lg px-[16px] py-[8px] text-[14px] md:text-[16px] text-left w-full ${getOptionColor(
                  shuffledIndex,
                  option.isCorrect
                )}`}
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

        {!changeState ? (
          <button
            className={`flex flex-row border border-[#4356FF] rounded-lg w-fit px-4 py-1 text-[#4356FF] ${
              clickedIndex == 9 ? "opacity-40" : ""
            }`}
            onClick={handleCheckAnswer}
            disabled={clickedIndex == 9}
          >
            <p>Check Answer</p>
          </button>
        ) : (
          <button
            className="flex flex-row border border-[#4356FF] rounded-lg w-fit px-4 py-1 text-[#4356FF]"
            onClick={handleNextQuestion}
          >
            <p>Next Question</p>
            <ArrowBigRight />
          </button>
        )}
      </section>
    </section>
  );
}
//practice test
