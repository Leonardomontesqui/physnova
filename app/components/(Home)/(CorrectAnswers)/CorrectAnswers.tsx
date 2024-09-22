"use client";
import React, { Suspense, useEffect, useState } from "react";
import { questionList } from "@/constants/questionList";
import Navigation from "./(Navigation)/Navigation";
import Question from "./Question";
import Explain from "./Explain";
import {
  fetchClickedOptionIndexes,
  fetchQuestionIndexes,
} from "@/lib/hooks/user";

export default function CorrectAnswers() {
  const [indexSet, setIndexSet] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [clickedOptionList, setClickedOptionList] = useState<number[]>([]);
  const [explanation, setExplanation] = useState<string>("");

  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    fetchQuestionData();
  }, []);

  useEffect(() => {
    if (indexSet.length > 0) {
      setCurrentQuestion(questionList[indexSet[0]]);
    }
  }, [indexSet]);

  const fetchQuestionData = async () => {
    const questionIndexes = await fetchQuestionIndexes();
    setIndexSet(questionIndexes);

    const clickedOptionIndexes = await fetchClickedOptionIndexes();
    setClickedOptionList(clickedOptionIndexes);
  };

  const handleClick = () => {
    if (!showExplanation) {
      setTriggerFetch(true); // Trigger the fetching only when showing the explanation
    }
    setShowExplanation(!showExplanation);
  };

  const userAnswer =
    currentQuestion?.Options[clickedOptionList[currentIndex]]?.text;

  const correctAnswer = currentQuestion?.Options.find(
    (option: any) => option.isCorrect
  )?.text;

  return (
    <div className="mt-[16px] lg:mt-0 w-full h-full min-h-0 bg-white rounded-2xl border border-[#d9d9d9] p-4 flex flex-col gap-[8px] basis-2/3">
      <Navigation
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        setCurrentQuestion={setCurrentQuestion}
        setShowExplanation={setShowExplanation}
        showExplanation={showExplanation}
        setExplanation={setExplanation}
        indexSet={indexSet}
        handleClick={handleClick}
      />

      <section className="Question&OptionsORExplain flex flex-col justify-between w-full h-full ">
        {!showExplanation ? (
          <Question
            currentQuestion={currentQuestion}
            clickedOptionList={clickedOptionList}
            currentIndex={currentIndex}
          />
        ) : (
          <Explain
            question={currentQuestion?.Question}
            userAnswer={userAnswer}
            correctAnswer={correctAnswer}
            diagramDescription={currentQuestion?.DiagramDescription}
            triggerFetchExplanation={triggerFetch}
            explanation={explanation}
            setExplanation={setExplanation}
            currentIndex={currentIndex}
          />
        )}
      </section>

      <div className="text-[#bfbfbf] text-[14px] flex w-full justify-between sticky bottom-0">
        {currentQuestion?.Topic && <div>{currentQuestion.Topic}</div>}
        {currentIndex + 1} of 5
      </div>
    </div>
  );
}
