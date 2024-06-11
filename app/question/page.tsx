import React from "react";
import NavBar from "../components/NavBar3";
import QuestionCard from "../components/QuestionCard";

export default function question() {
  return (
    <main className="h-dvh w-dvw flex flex-col">
      <NavBar />
      <div className="h-full w-full bg-[#f6f7fb] py-[40px] px-[200px] overflow-y-scroll">
        <QuestionCard />
      </div>
    </main>
  );
}
