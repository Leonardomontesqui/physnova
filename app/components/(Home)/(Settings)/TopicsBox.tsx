import React, { useState } from "react";
import TopicButton from "./TopicButton";
import { topics } from "@/constants/topics";

interface TopicsBoxProps {
  topicsChosen: string[];
  setTopicsChosen: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TopicsBox({
  topicsChosen,
  setTopicsChosen,
}: TopicsBoxProps) {
  const handleTopicClick = (topic: string) => {
    // setTopicsChosen((prev) => [...prev, topic]);
    setTopicsChosen((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
    // console.log("Topic Chosen: ", topicsChosen);
  };

  return (
    <div className="flex flex-wrap w-full h-full gap-[8px] gap-y-[8px] justify-auto">
      {topics.map((topic) => (
        <TopicButton
          key={topic}
          onClick={() => handleTopicClick(topic)}
          selected={topicsChosen.includes(topic)}
        >
          {topic}
        </TopicButton>
      ))}
    </div>
  );
}
