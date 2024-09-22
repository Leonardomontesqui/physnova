import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

interface option {
  text: string;
  isCorrect: boolean;
}

interface QuestionType {
  currentQuestion: any;
  clickedOptionList: number[];
  currentIndex: number;
}

export default function Question({
  currentQuestion,
  clickedOptionList,
  currentIndex,
}: QuestionType) {
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
    <>
      <section className="flex min-h-0 h-full flex-col gap-[8px] overflow-y-scroll no-scrollbar">
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
      </section>
      <section className="flex flex-col gap-[8px] w-full">
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
      </section>
    </>
  );
}
