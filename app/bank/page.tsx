"use client";
import React, { useState } from "react";

import Filter from "@/components/(Bank)/Filter";
import QuestionBank from "@/components/(Bank)/QuestionBank";

export default function Bank() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  return (
    <main className="flex flex-col px-4 md:flex-row gap-6 md:px-[200px] pt-4 md:pt-6 h-full overflow-hidden bg-[#f6f7fb]">
      <Filter
        selectedTopics={selectedTopics}
        setSelectedTopics={setSelectedTopics}
      />
      <QuestionBank selectedTopics={selectedTopics} />
    </main>
  );
}
