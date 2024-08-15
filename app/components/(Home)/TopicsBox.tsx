import React, { useState } from "react";
import TopicButton from "./TopicButton";

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
      {[
        "Measurements and Uncertainties",
        "Mechanics",
        "Waves",
        "Thermal Physics",
        "Electricity and Magnetism",
        "Atomic, Nuclear and Particle Physics",
      ].map((topic) => (
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
