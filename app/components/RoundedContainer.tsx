import React, { Children } from "react";

interface Props {
  children: React.ReactNode;
  className?: string; //optional string property
}

export default function RoundedContainer({ children, className }: Props) {
  return (
    <div
      className={`p-[24px] rounded-xl border border-[#dedede] gap-[8px] w-full ${className}`}
    >
      {children}
    </div>
  );
}
