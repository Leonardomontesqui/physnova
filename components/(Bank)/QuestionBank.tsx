"use client";
import React, { useEffect, useState } from "react";
import SavedQuestion from "./SavedQuestion";
import { questionList } from "@/constants/questionList";
import { fetchSavedIndexes } from "@/lib/hooks/user";

export default function QuestionBank({
  selectedTopics,
}: {
  selectedTopics: string[];
}) {
  const [filteredIndexes, setFilteredIndexes] = useState<number[]>([]);
  const [savedIndexes, setSavedIndexes] = useState([]);

  useEffect(() => {
    setIndexes();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [selectedTopics]);

  const filterQuestions = () => {
    // you will have to change the indexes variabel to what the user uploads, it's only going to iterate through the index list
    if (selectedTopics.length > 0) {
      let tempIndexes = selectedTopics.map((topic) => {
        let temp = savedIndexes.filter(
          (index) => questionList[index].Topic === topic
        );
        return temp;
      });
      setFilteredIndexes(tempIndexes.flat());
    } else {
      setFilteredIndexes(savedIndexes);
    }
  };

  const setIndexes = async () => {
    const indexes = await fetchSavedIndexes();
    setSavedIndexes(indexes || []);
    setFilteredIndexes(indexes || []);
  };

  return (
    <div className="flex flex-col w-full md:w-2/3 gap-4 h-full overflow-y-auto no-scrollbar">
      {filteredIndexes.map((index) => (
        <SavedQuestion index={index} key={index} />
      ))}
    </div>
  );
}
