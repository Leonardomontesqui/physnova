import React, { useEffect, useState } from "react";
import { questionList } from "../questionList";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";

const supabase = supabaseBrowser();

interface option {
  text: string;
  isCorrect: boolean;
}
export default function CorrectAnswers() {
  const [indexSet, setIndexSet] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [clickedOptionList, setClickedOptionList] = useState<number[]>([]);

  useEffect(() => {
    fetchQuestionIndex();
  }, []);

  useEffect(() => {
    if (indexSet.length > 0) {
      setCurrentQuestion(questionList[indexSet[0]]);
    }
  }, [indexSet]);

  const fetchQuestionIndex = async () => {
    const { data: userDataRes, error: userDataError } =
      await supabase.auth.getUser();

    if (!userDataRes || userDataError) {
      console.error("Error fetching user data");
      return;
    }

    const { data: gameplayDataRes, error: gameplayDataError } = await supabase
      .from("gameplay")
      .select("question_index_list")
      .eq("user_id", userDataRes.user.id)
      .order("created_at", { ascending: true });

    if (!gameplayDataRes || gameplayDataError) {
      console.error("Error fetching gameplay data");
      return;
    } else {
      const latestGameData = gameplayDataRes[gameplayDataRes.length - 1];
      setIndexSet(latestGameData.question_index_list);
      // console.log("This are the questions: ", gameplayDataRes);
    }

    //latest option index data
    const { data: optionIndex, error: optionIndexError } = await supabase
      .from("gameplay")
      .select("option_index_list")
      .eq("user_id", userDataRes.user.id)
      .order("created_at", { ascending: true }); // this solves all

    if (!optionIndex || optionIndexError) {
      console.error("Error fetching option index data");
      return;
    } else {
      const latestOptionData = optionIndex[optionIndex.length - 1];
      setClickedOptionList(latestOptionData.option_index_list);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < 4) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentQuestion(questionList[indexSet[newIndex]]);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentQuestion(questionList[indexSet[newIndex]]);
    }
  };

  const getOptionColor = (index: number, isCorrect: boolean) => {
    if (index == clickedOptionList[currentIndex]) {
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
    <div className="mt-[16px] md:mt-0 w-full h-full min-h-0 bg-white rounded-3xl border border-[#d9d9d9] p-[24px] flex flex-col gap-[8px] basis-2/3">
      <div className="flex justify-between w-full">
        <button
          className="border border-[#d0cece] rounded px-[2px] py-[2px]"
          onClick={() => handlePrevClick()}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="font-medium">Answers</div>
        <button
          className="border border-[#d0cece] rounded px-[2px] py-[2px]"
          onClick={() => handleNextClick()}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex min-h-0 h-full flex-col gap-[8px] overflow-y-scroll no-scrollbar">
        <div>
          {currentQuestion?.Question && (
            <ReactMarkdown
              className="text-[14px]"
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
            >
              {currentQuestion.Question}
            </ReactMarkdown>
          )}
        </div>
        <div className="max-h-[170px]">
          {currentQuestion?.Image && (
            <img
              className="mx-auto h-[100%]"
              src={currentQuestion.Image}
              alt="Image Related to Question"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[8px] w-full">
        {currentQuestion?.Options &&
          currentQuestion?.Options.map((option: option, index: number) => (
            <div
              key={option.text}
              className={`border rounded-lg px-[16px] py-[8px] text-left text-[14px] ${getOptionColor(
                index,
                option.isCorrect
              )}`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
              >
                {option.text}
              </ReactMarkdown>
            </div>
          ))}
      </div>
      <div className="text-[#bfbfbf] text-[14px] flex w-full justify-between">
        {currentQuestion?.Topic && <div>{currentQuestion.Topic}</div>}
        {currentIndex + 1} of 5
      </div>
    </div>
  );
}
