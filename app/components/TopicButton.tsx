import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: (topic: string) => void;
}

export default function TopicButton({ children, onClick }: Props) {
  return (
    <button
      className="px-[8px] py-[4px] bg-[#ffffff] border border-[#dedede] text-[14px] rounded-xl"
      onClick={() => onClick && onClick(children as string)}
    >
      {children}
    </button>
  );
}
