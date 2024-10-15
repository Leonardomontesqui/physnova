import { AlignJustify, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import SavedButton from "./SavedButton";
import AIExplainButton from "./AIExplainButton";
import { questionList } from "@/constants/questionList";

interface NavigationProps {
  setCurrentIndex: (number: number) => void;
  currentIndex: number;
  setCurrentQuestion: (question: any) => void;
  setShowExplanation: (truth: boolean) => void;
  showExplanation: boolean;
  setExplanation: (explanation: string) => void;
  indexSet: number[];
  handleClick: () => void;
  questionAmount: number;
}

export default function Navigation({
  setCurrentIndex,
  currentIndex,
  setCurrentQuestion,
  setShowExplanation,
  showExplanation,
  setExplanation,
  indexSet,
  handleClick,
  questionAmount,
}: NavigationProps) {
  const handleNextClick = () => {
    if (currentIndex < questionAmount - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentQuestion(questionList[indexSet[newIndex]]);
      setShowExplanation(false);
      setExplanation("");
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentQuestion(questionList[indexSet[newIndex]]);
      setShowExplanation(false);
      setExplanation("");
    }
  };
  return (
    <header className="flex justify-between w-full relative">
      <button
        className="border border-[#d0cece] rounded px-[2px] py-[2px]"
        onClick={() => handlePrevClick()}
      >
        <ChevronLeft size={20} />
      </button>
      <div className="absolute font-medium left-[40%] ">Summary</div>
      <div className="flex gap-1 md:gap-2">
        <AIExplainButton
          onClick={handleClick}
          isDisabled={false}
          showExplanation={showExplanation}
        />
        <SavedButton indexSet={indexSet} currentIndex={currentIndex} />
        <button
          className="border border-[#d0cece] rounded px-[2px] py-[2px]"
          onClick={() => handleNextClick()}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </header>
  );
}
