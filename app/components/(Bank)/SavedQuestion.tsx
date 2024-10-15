import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { questionList } from "@/constants/questionList";

export default function SavedQuestion({ index }: { index: number }) {
  return (
    <section className="relative QuestionCard min-h-[600px] max-h-[800px] flex flex-col bg-white rounded-3xl border border-[#d9d9d9] p-4 gap-2 overflow-y-scroll no-scrollbar">
      <header className="flex justify-between w-full text-sm text-[#bfbfbf]">
        <p>{questionList[index]?.Exam}</p>
        <p>{questionList[index]?.Topic}</p>
      </header>

      <ReactMarkdown
        className="text-sm"
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
      >
        {questionList[index]?.Question}
      </ReactMarkdown>

      {questionList[index]?.Image && (
        <img
          className="mx-auto  max-h-[80px] md:max-h-[170px]"
          src={questionList[index].Image}
          alt="Diagram"
        />
      )}

      <section className="absolute bottom-4 flex flex-col gap-2 left-4 right-4">
        {questionList[index]?.Options.map((option) => (
          <div
            className={`border rounded-lg px-4 py-2 text-left text-sm ${
              option.isCorrect ? "border-[#d2e9d8] bg-[#ecf8ef]" : "border"
            }`}
            key={index}
          >
            <ReactMarkdown
              className="text-sm"
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
            >
              {option.text}
            </ReactMarkdown>
          </div>
        ))}
      </section>
    </section>
  );
}
