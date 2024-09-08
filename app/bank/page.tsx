"use client";
import React, { useState } from "react";

import Filter from "../components/(Bank)/Filter";
import NavBar from "../components/(ui)/(NavBars)/NavBar3";
import QuestionBank from "../components/(Bank)/QuestionBank";

const indexes = [4, 0, 3, 5, 6, 8, 23, 14, 7];

export default function Bank() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  return (
    <main className="flex-grow flex gap-6 px-[200px] pt-6 h-full overflow-hidden bg-[#f6f7fb]">
      <Filter
        selectedTopics={selectedTopics}
        setSelectedTopics={setSelectedTopics}
      />
      <QuestionBank selectedTopics={selectedTopics} />
    </main>
  );
}
