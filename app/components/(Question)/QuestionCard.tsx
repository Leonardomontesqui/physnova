"use client";
import React, { useState, useEffect } from "react";
import { questionList } from "../../../constants/questionList";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";

const supabase = supabaseBrowser(); // this makes it a variable for all
type QuestionType = (typeof questionList)[0];

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function QuestionCard() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [optionClickedIndex, setOptionClickedIndex] = useState<number[]>([]);
  const [shuffledOptionIndices, setShuffledOptionIndices] = useState<number[]>(
    []
  );
  const [questionIndexes, setQuestionIndexes] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    generateIndexList();
    // testingIndexList();
  }, []);

  useEffect(() => {
    if (questionIndexes.length > 0) {
      setCurrentQuestion(questionList[questionIndexes[0]]);
    }
  }, [questionIndexes]);

  useEffect(() => {
    if (currentQuestion?.Options) {
      setShuffledOptionIndices(shuffleArray([0, 1, 2, 3]));
    }
  }, [currentQuestion]);

  const generateIndexList = async () => {
    //fetching the topics

    const { data: userData, error: userDataError } =
      await supabase.auth.getUser();

    if (!userData || userDataError) {
      console.error("Error fetching user data");
      router.push("/");
      return;
    }

    const { data: topicData, error: topicDataError } = await supabase
      .from("topics_chosen")
      .select("topics")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: true });

    if (topicDataError) {
      console.error("Error fetching topic data");
      return;
    }

    const topics = topicData[topicData.length - 1]["topics"];

    //generating the 5 question list based on the topics
    if (topics.length > 0) {
      // Create a set for O(1) topic lookup
      const topicSet = new Set(topics);

      // Collect the indexes of the questions that match the topics
      const filteredQuestionsWithIndexes = questionList.reduce(
        (acc: any, question, index: number) => {
          if (topicSet.has(question.Topic)) {
            acc.push(index);
          }
          return acc;
        },
        []
      );

      // Shuffle the filtered questions array
      const shuffledQuestions = shuffleArray(filteredQuestionsWithIndexes);

      const selectedIndexes = shuffledQuestions.slice(0, 5);
      console.log("Selected indexes of 5 random questions: ", selectedIndexes);

      setQuestionIndexes(selectedIndexes);
    } else {
      const allIndexes = Array.from(
        { length: questionList.length },
        (_, index) => index
      );

      // Shuffle and select 5 random indexes
      const shuffledIndexes = shuffleArray(allIndexes);
      const selectedIndexes = shuffledIndexes.slice(0, 5);
      setQuestionIndexes(selectedIndexes);
    }
    return;
  };

  const testingIndexList = () => {
    // Set originalIndexes to the last five indexes of questionList
    const lastFiveIndexes = questionList
      .slice(-5)
      .map((_, index) => questionList.length - 5 + index)
      .reverse();
    setQuestionIndexes(lastFiveIndexes);
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
        question_index_list: questionIndexes,
        option_index_list: updatedIndexSelect,
      });

    if (gameplayInsertError) {
      console.error("Error inserting gameplay data");
    }
    window.location.href = "/home";
  };

  const handleOptionClick = async (index: number, option: any) => {
    // console.log("Index clicked: ", index);
    setOptionClickedIndex((prev) => [...prev, index]);

    if (option.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    //used to be <=5
    if (currentIndex < 4) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentQuestion(questionList[questionIndexes[newIndex]]);
    } else {
      await insertGamePlayData(index, option.isCorrect);
    }
  };

  return (
    <section className="relative h-full lg:max-w-[1080px] lg:min-w-[600px] md:border md:rounded-3xl bg-white flex flex-col px-[20px] py-[20px] border md:my-[40px] overflow-y-scroll no-scrollbar gap-2">
      <header className="text-[#bfbfbf] text-xs md:text-sm flex w-full justify-between">
        <p>{currentIndex + 1} of 5</p>
        <p>{currentQuestion?.Topic}</p>
      </header>

      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        className="text-sm md:text-base"
      >
        {currentQuestion?.Question}
      </ReactMarkdown>

      {currentQuestion?.Image && (
        <img
          className="mx-auto max-h-[250px]"
          src={currentQuestion?.Image}
          alt="Image Related to Question"
        />
      )}

      <section className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
        {currentQuestion?.Options &&
          shuffledOptionIndices.map((shuffledIndex) => {
            const option = currentQuestion.Options[shuffledIndex];
            return (
              <button
                key={shuffledIndex}
                className="border rounded-lg px-[16px] py-[8px] text-[14px] md:text-[16px] text-left md:hover:bg-[#f7f7f7] after:bg-[#4356ff]"
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
      </section>
    </section>
  );
}
