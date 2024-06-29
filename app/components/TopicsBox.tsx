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
    <div className="flex flex-wrap w-full gap-[8px] justify-center">
      <TopicButton
        onClick={() => handleTopicClick("Measurements and Uncertainties")}
        selected={topicsChosen.includes("Measurements and Uncertainties")}
      >
        Measurements and Uncertainties
      </TopicButton>
      <TopicButton
        onClick={() => handleTopicClick("Mechanics")}
        selected={topicsChosen.includes("Mechanics")}
      >
        Mechanics
      </TopicButton>
      <TopicButton
        onClick={() => handleTopicClick("Waves")}
        selected={topicsChosen.includes("Waves")}
      >
        Waves
      </TopicButton>
      <TopicButton
        onClick={() => handleTopicClick("Thermal Physics")}
        selected={topicsChosen.includes("Thermal Physics")}
      >
        Thermal Physics
      </TopicButton>
      <TopicButton
        onClick={() => handleTopicClick("Electricity and Magnetism")}
        selected={topicsChosen.includes("Electricity and Magnetism")}
      >
        Electricity and Magnetism
      </TopicButton>
      {/* <TopicButton
        onClick={() => handleTopicClick("Circular Motion and Gravitation")}
        selected={topicsChosen.includes("Circular Motion and Gravitation")}
      >
        Circular Motion and Gravitation
      </TopicButton> */}
      <TopicButton
        onClick={() => handleTopicClick("Atomic, Nuclear and Particle Physics")}
        selected={topicsChosen.includes("Atomic, Nuclear and Particle Physics")}
      >
        Atomic, Nuclear and Particle Physics
      </TopicButton>
      {/* <TopicButton
        onClick={() => handleTopicClick("Energy Production")}
        selected={topicsChosen.includes("Energy Production")}
      >
        Energy Production
      </TopicButton> */}
    </div>
  );
}
