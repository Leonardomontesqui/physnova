import React, { Children } from "react";

interface Props {
  children: React.ReactNode;
  className?: string; //optional string property
}

//used to be padding 24 px
export default function RoundedContainer({ children, className }: Props) {
  return (
    <div
      className={`px-[16px] py-[8px] rounded-xl border border-[#dedede] gap-[8px] w-full ${className}`}
    >
      {children}
    </div>
  );
}
