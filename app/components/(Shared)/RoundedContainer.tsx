import React, { Children } from "react";

interface Props {
  children: React.ReactNode;
  className?: string; //optional string property
  onClick?: () => void;
}

export default function RoundedContainer({
  children,
  className,
  onClick,
}: Props) {
  return (
    <div
      className={`px-4 py-2 rounded-2xl border border-[#dedede] gap-[8px] w-full ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
