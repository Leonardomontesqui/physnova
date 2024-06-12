'use client';
import React, {useState, useEffect} from 'react';
<<<<<<< Updated upstream
import {questionList} from '../questionList';
import {supabaseBrowser} from '@/lib/supabase/browser';
import {User} from '@supabase/supabase-js';
import {useRouter} from 'next/navigation';
=======
import {QUESTION_LIST} from '../../lib/constants';
import {supabaseBrowser} from '@/lib/supabase/browser';
import {useRouter} from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
>>>>>>> Stashed changes

const supabase = supabaseBrowser();

export default function QuestionCard() {
  const [currentIndexSet, setCurrentIndexSet] = useState<number[]>([]); // Track used question indices using a Set
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Current question index
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // Counter for correct answers
  const currentQuestion =
    currentIndex !== null ? QUESTION_LIST[currentIndex] : null;
  const router = useRouter();

  useEffect(() => {
    getNextUniqueIndex();
  }, []);

  const insertGameplayData = async (isLastCorrect: boolean) => {
    const supabase = supabaseBrowser();

<<<<<<< Updated upstream
    const {data: userDataRes, error: userDataError} =
      await supabase.auth.getUser();

    if (!userDataRes || userDataError) {
=======
  const getNextUniqueIndex = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * QUESTION_LIST.length);
    } while (questionIndexSet.includes(newIndex));

    setQuestionIndexSet((prev) => [...prev, newIndex]);
    setCurrentIndex(newIndex);
  };

  const insertGamePlayData = async (index: number, isLastCorrect: boolean) => {
    let updatedIndexSelect = optionClickedIndex;
    updatedIndexSelect.push(index);
    const {data: userData, error: userDataError} =
      await supabase.auth.getUser();

    if (!userData || userDataError) {
>>>>>>> Stashed changes
      console.error('Error fetching user data');
      return;
    }

<<<<<<< Updated upstream
    const {error} = await supabase.from('gameplay').insert({
      accurate: correctAnswers + Number(isLastCorrect),
      name: userDataRes.user.user_metadata.name,
    });

    if (error) {
=======
    const {error: gameplayInsertError} = await supabase
      .from('gameplay')
      .insert({
        accurate: correctAnswers + Number(isLastCorrect),
        name: userData.user.user_metadata.name,
        question_index_list: questionIndexSet,
        option_index_list: updatedIndexSelect,
      });

    if (gameplayInsertError) {
>>>>>>> Stashed changes
      console.error('Error inserting gameplay data');
    }
  };

  const getNextUniqueIndex = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * questionList.length);
    } while (questionIndexSet.includes(newIndex));

    setQuestionIndexSet((prev) => [...prev, newIndex]);
    setCurrentIndex(newIndex);
  };

  const insertGamePlayData = async (index: number, isLastCorrect: boolean) => {
    let updatedIndexSelect = optionClickedIndex;
    updatedIndexSelect.push(index);
    const { data: userData, error: userDataError } =
      await supabase.auth.getUser();

    if (!userData || userDataError) {
      console.error("Error fetching user data");
      return;
    }

    const { error: gameplayInsertError } = await supabase
      .from("gameplay")
      .insert({
        accurate: correctAnswers + Number(isLastCorrect),
        name: userData.user.user_metadata.name,
        question_index_list: questionIndexSet,
        option_index_list: updatedIndexSelect,
      });

    if (gameplayInsertError) {
      console.error("Error inserting gameplay data");
    }
  };

  const handleOptionClick = async (index: number, option: any) => {
    // console.log("Index clicked: ", index);
    setOptionClickedIndex((prev) => [...prev, index]);

    if (option.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (questionIndexSet.length <= 5) {
      getNextUniqueIndex();
    } else {
<<<<<<< Updated upstream
      insertGameplayData(option.isCorrect as boolean);
=======
      insertGamePlayData(index, option.isCorrect);
>>>>>>> Stashed changes
      router.push('/home');
    }
  };

  return (
    <div className="min-h-full h-full w-full border rounded-3xl bg-white flex flex-col px-[64px] py-[20px] gap-[16px]">
      <div className="text-[#bfbfbf] text-[14px]">
        {questionIndexSet.length - 1} of 5
      </div>
      <div className="flex flex-col gap-[16px] h-full">
        <div>
          {currentQuestion?.Question && (
            <ReactMarkdown
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
            >
              {currentQuestion.Question}
            </ReactMarkdown>
          )}
        </div>
<<<<<<< Updated upstream
    <div className='h-full w-full border rounded-3xl bg-white flex flex-col px-[60px] py-[40px] justify-between'>
      <div className='flex flex-col gap-[32px]'>
        <div className='text-[#bfbfbf]'>{currentIndexSet.length - 1} of 5</div>
        <div className=''>{currentQuestion?.Question}</div>{' '}
      </div>

        {currentQuestion?.Image && (
          <img
            className="mx-auto max-h-[200px]"
            src={currentQuestion.Image}
            alt="Image Related to Question"
          />
        )}
      </div>
      <div className="flex flex-col gap-[8px]">
        {currentQuestion?.Options &&
          shuffledOptionIndices.map((shuffledIndex) => {
            const option = currentQuestion.Options[shuffledIndex];
            return (
              <button
                key={shuffledIndex}
                className="border rounded-lg px-[16px] py-[8px] text-left hover:bg-[#f7f7f7] after:bg-[#4356ff]"
                onClick={() => handleOptionClick(shuffledIndex, option)}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                >
                  {option.text}
                </ReactMarkdown>
              </button>
            );
          })}
      </div>
    </div>
  );
}
