"use client";
import React, { useState } from "react";
import TopicsBox from "./TopicsBox";
import { insertCustomSettings } from "@/lib/hooks/user";
import { useRouter } from "next/navigation";

export default function CustomOption() {
  const [topicsChosen, setTopicsChosen] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(5);
  const router = useRouter();

  const handleAmount = (increment: number) => {
    const updatedAmount = amount + increment;

    if (updatedAmount >= 5 && updatedAmount <= 10) {
      setAmount(updatedAmount);
    } else if (updatedAmount < 5) {
      setAmount(5);
    } else {
      setAmount(10);
    }
  };

  return (
    <>
      <p className="text-sm font-medium">Number of Questions</p>
      <div className="flex">
        <button
          onClick={() => handleAmount(-1)}
          className="border border-[#dedede] px-2 rounded-l-md"
        >
          -
        </button>
        <p className="w-8 border border-[#dedede] text-center">{amount}</p>
        <button
          onClick={() => handleAmount(1)}
          className="border border-[#dedede] px-2 rounded-r-md"
        >
          +
        </button>
      </div>
      <p className="text-sm font-medium">Select Topics</p>
      <TopicsBox
        topicsChosen={topicsChosen}
        setTopicsChosen={setTopicsChosen}
      />
      <button
        className="absolute bottom-4 px-5 py-1 bg-white rounded-xl border-2 border-[#4356ff] self-center text-[#4356ff] font-medium text-[16px] hover:bg-[#4356ff] hover:text-white"
        onClick={async () => {
          console.log("Button clicked");
          await insertCustomSettings(topicsChosen, amount);
          router.push("/question");
        }}
      >
        Play
      </button>
    </>
  );
}
