"use client";
import React, { useEffect, useState } from "react";
import SavedQuestion from "./SavedQuestion";
import { questionList } from "@/constants/questionList";
import { topics } from "@/constants/topics";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { fetchSavedIndexes } from "@/lib/hooks/user";
const indexes = [4, 0, 3, 5, 6, 8, 23, 14, 7];
const supabase = supabaseBrowser();

export default function QuestionBank({
  selectedTopics,
}: {
  selectedTopics: string[];
}) {
  const [filteredIndexes, setFilteredIndexes] = useState<number[]>([]);
  const [userID, setUserID] = useState<string>();
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
    setSavedIndexes(indexes);
    setFilteredIndexes(indexes);
  };

  return (
    <div className="flex flex-col w-full md:w-2/3 gap-4 h-full overflow-y-auto no-scrollbar">
      {filteredIndexes.map((index) => (
        <SavedQuestion index={index} key={index} />
      ))}
    </div>
  );
}
