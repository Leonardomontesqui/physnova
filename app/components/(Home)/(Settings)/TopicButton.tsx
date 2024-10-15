import React from "react";

interface Props {
  children: string;
  onClick?: (topic: string) => void;
  selected?: boolean;
}

export default function TopicButton({ children, onClick, selected }: Props) {
  return (
    <button
      className={`px-[8px] h-fit py-[4px] bg-[#ffffff] border border-[#dedede] text-[14px] rounded-xl ${
        selected
          ? "bg-sky-400 text-black border border-sky-600"
          : "bg-[#ffffff] border-[#dedede]"
      }`}
      onClick={() => onClick && onClick(children)}
    >
      {children}
    </button>
  );
}
