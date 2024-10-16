import { Sparkles } from "lucide-react";
import React, { useState } from "react";

interface AIExplainButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  showExplanation: boolean;
}

export function AIExplainButton({
  onClick,
  isDisabled,
  showExplanation,
}: AIExplainButtonProps) {
  return (
    <button
      className={`flex flex-row gap-2 bg-[#ffffff] items-center border border-[#d0cece] rounded px-[2px] py-[2px]${
        isDisabled ? "disabled opacity-50" : ""
      }`}
      onClick={!isDisabled ? onClick : undefined}
    >
      <Sparkles size={20} strokeWidth={1.75} />
    </button>
  );
}

export default AIExplainButton;
