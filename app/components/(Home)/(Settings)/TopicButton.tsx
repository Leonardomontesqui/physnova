import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: (topic: string) => void;
  selected?: boolean;
}

export default function TopicButton({ children, onClick, selected }: Props) {
  return (
    <button
      className={`px-[8px] h-fit py-[4px] bg-[#ffffff] border border-[#dedede] text-[14px] rounded-xl ${
        selected
          ? "bg-gray-200 text-black border border-[#eeefe]"
          : "bg-[#ffffff] border-[#dedede]"
      }`}
      onClick={() => onClick && onClick(children as string)}
    >
      {children}
    </button>
  );
}
