"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { questionList } from "@/constants/questionList";
import { topics } from "@/constants/topics";

export default function Filter({
  selectedTopics,
  setSelectedTopics,
}: {
  selectedTopics: string[];
  setSelectedTopics: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleFilterClick = (selectedTopic: string) => {
    if (selectedTopics.includes(selectedTopic)) {
      let filters = selectedTopics.filter((el) => el != selectedTopic);
      setSelectedTopics(filters);
    } else {
      setSelectedTopics([...selectedTopics, selectedTopic]);
    }
  };

  return (
    <div className="h-fit w-1/3 bg-white rounded-3xl border border-[#d9d9d9] p-4 flex flex-col items-center">
      <h1 className="font-medium w-fit">Filter</h1>
      <div className="flex flex-col w-full ">
        {topics.map((topic, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Checkbox
              className="text-[#d9d9d9]"
              onClick={() => handleFilterClick(topic)}
            />
            <label className="text-sm">{topic}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
