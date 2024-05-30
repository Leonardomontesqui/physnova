import React, {useEffect, useState} from 'react';
import RoundedContainer from './RoundedContainer';
import {supabaseBrowser} from '@/lib/supabase/browser';

interface Gameplay {
  accurate: number;
}

const supabase = supabaseBrowser();

export default function AccuracyDisplay() {
  const [gameplayData, setGameplayData] = useState<Gameplay[]>([]);
  const totalAccurate =
    gameplayData?.reduce((sum, game) => sum + game.accurate, 0) || 0;
  const totalQuestions = gameplayData?.length * 5;
  const totalIncorrect = totalQuestions - totalAccurate;

  useEffect(() => {
    fetchLatestAccuracy();
  }, []);

  const fetchLatestAccuracy = async () => {
    const {data: userDataRes, error: userDataError} =
      await supabase.auth.getUser();

    if (!userDataRes || userDataError) {
      console.error('Error fetching user data');
      return;
    }

    const {data: gameplayDataRes, error: gameplayDataError} = await supabase
      .from('gameplay')
      .select('accurate')
      .eq('user_id', userDataRes.user.id);

    if (!gameplayDataRes || gameplayDataError) {
      console.error('Error fetching gameplay data');
      return;
    }

    setGameplayData(gameplayDataRes);
  };

  return (
    <div className='flex flex-col gap-[16px]'>
      <div className='flex items-center gap-[8px]'>
        <div className='w-full h-[1px] bg-[#dedede]' />
        <p className=''>Latest</p>
        <div className='w-full h-[1px] bg-[#dedede]' />
      </div>
      <RoundedContainer>
        Accuracy:{' '}
        {gameplayData && gameplayData[gameplayData.length - 1]?.accurate}/5
      </RoundedContainer>
      <div className='flex items-center gap-[8px]'>
        <div className='w-full h-[1px] bg-[#dedede]' />
        <p className=''>Overall</p>
        <div className='w-full h-[1px] bg-[#dedede]' />
      </div>
      <RoundedContainer>Questions Seen: {totalQuestions}</RoundedContainer>
      <div className='flex gap-[16px]'>
        <RoundedContainer>Answered Correctly: {totalAccurate}</RoundedContainer>
        <RoundedContainer className='flex items-center'>
          Answered Incorrectly: {totalIncorrect}
        </RoundedContainer>
      </div>
    </div>
  );
}
