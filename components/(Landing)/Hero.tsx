import React from "react";

export default function Hero() {
  return (
    <>
      <p className="text-[14px] text-[#515151] px-[16px] py-[4px] border border-[#eeeeee] rounded-full flex items-center gap-1">
        {" "}
        Free because we&apos;re also{" "}
        <img src="IBLogo.png" className="w-[16px] h-[16px] inline"></img>{" "}
        Students
      </p>
      <h1 className="font-semibold md:text-[64px] text-[48px] text-center max-w-[900px] md:leading-[74px] leading-[50px]">
        The{" "}
        <a className="bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent p-0">
          free &amp; fun
        </a>{" "}
        self-testing platform for{" "}
        <a className="bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
          IB Physics
        </a>
      </h1>
      <h2 className="text-xl lg:text-2xl text-center  text-[#666666] max-w-[700px]">
        Ace the Paper 1 with hundreds of past exam questions, mock exams, &amp;
        personalized AI feedback
      </h2>
    </>
  );
}
