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
    setTopicsChosen((prev) => [...prev, topic]);
    console.log("Topic Chosen: ", topicsChosen);
  };
  return (
    <div className="flex flex-wrap w-full gap-[8px] justify-center">
      <TopicButton
        onClick={() => handleTopicClick("Measurements and Uncertainties")}
      >
        Measurements and Uncertainties
      </TopicButton>
      <TopicButton onClick={() => handleTopicClick("Mechanics")}>
        Mechanics
      </TopicButton>
      <TopicButton onClick={() => handleTopicClick("Waves")}>Waves</TopicButton>
      <TopicButton onClick={() => handleTopicClick("Thermal Physics")}>
        Thermal Physics
      </TopicButton>
      <TopicButton
        onClick={() => handleTopicClick("Electricity and Magnetism")}
      >
        Electricity and Magnetism
      </TopicButton>
      <TopicButton
        onClick={() => handleTopicClick("Circular Motion and Gravitation")}
      >
        Circular Motion and Gravitation
      </TopicButton>
      <TopicButton
        onClick={() => handleTopicClick("Atomic, Nuclear and Particle Physics")}
      >
        Atomic, Nuclear and Particle Physics
      </TopicButton>
      <TopicButton onClick={() => handleTopicClick("Energy Production")}>
        Energy Production
      </TopicButton>
    </div>
  );
}
