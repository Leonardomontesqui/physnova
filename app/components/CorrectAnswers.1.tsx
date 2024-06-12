import React, { useEffect, useState } from "react";
import { questionList } from "../questionList";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { ChevronLeft, ChevronRight } from "lucide-react";

const supabase = supabaseBrowser();

interface option {
  text: string;
  isCorrect: boolean;
}
export default function CorrectAnswers() {
  const [indexSet, setIndexSet] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [clickedOptionList, setClickedOptionList] = useState<number[]>([]);

  useEffect(() => {
    fetchQuestionIndex();
  }, []);

  useEffect(() => {
    if (indexSet.length > 0) {
      setCurrentQuestion(questionList[indexSet[1]]);
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
      .eq("user_id", userDataRes.user.id);

    if (!gameplayDataRes || gameplayDataError) {
      console.error("Error fetching gameplay data");
      return;
    } else {
      const latestGameData = gameplayDataRes[gameplayDataRes.length - 1];
      setIndexSet(latestGameData.question_index_list);
    }

    //latest option index data
    const { data: optionIndex, error: optionIndexError } = await supabase
      .from("gameplay")
      .select("option_index_list")
      .eq("user_id", userDataRes.user.id);

    if (!optionIndex || optionIndexError) {
      console.error("Error fetching option index data");
      return;
    } else {
      const latestOptionData = optionIndex[optionIndex.length - 1];
      setClickedOptionList(latestOptionData.option_index_list);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < 5) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentQuestion(questionList[indexSet[newIndex]]);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 1) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentQuestion(questionList[indexSet[newIndex]]);
    }
  };

  const getOptionColor = (index: number, isCorrect: boolean) => {
    if (index == clickedOptionList[currentIndex - 1]) {
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
    <div className="w-full h-full min-h-0 bg-white rounded-3xl border border-[#d9d9d9] p-[24px] flex flex-col items-center gap-[8px] basis-2/3">
      <div className="font-medium">Answers</div>
      <div className="h-full min-h-0 w-full border rounded-3xl bg-white flex flex-col px-[32px] py-[16px] gap-[16px]">
        <div className="text-[#bfbfbf] text-[14px]">{currentIndex} of 5</div>
        <div className="flex min-h-0 h-full flex-col gap-[8px] min-h-0 overflow-y-scroll no-scrollbar">
          <div>
            {currentQuestion?.Question && (
              <ReactMarkdown
                className="text-[14px]"
                children={currentQuestion.Question}
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
              />
            )}
          </div>
          <div className="max-h-[140px]">
            {currentQuestion?.Image && (
              <img
                className="mx-auto h-[100%]"
                src={currentQuestion.Image}
                alt="Image Related to Question"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[8px] ">
          {currentQuestion?.Options &&
            currentQuestion?.Options.map((option: option, index: number) => (
              <div
                key={option.text}
                className={`border rounded-lg px-[16px] py-[8px] text-left ${getOptionColor(
                  index,
                  option.isCorrect
                )}`}
              >
                <ReactMarkdown
                  children={option.text}
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <button
          className="border border-[#d0cece] mx-2 rounded px-[2px] py-[2px]"
          onClick={() => handlePrevClick()}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="border border-[#d0cece] mx-2 rounded px-[2px] py-[2px]"
          onClick={() => handleNextClick()}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
