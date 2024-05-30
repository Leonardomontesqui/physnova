'use client';

import React from 'react';
import NavBar2 from '../components/NavBar2';
import ProfileHeader from '../components/ProfileHeader.1';
import AccuracyDisplay from '../components/AccuracyDisplay';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handlePlayClick = () => {
    router.push('/question');
  };

  return (
    <main className='flex flex-col w-dvh h-dvh'>
      <NavBar2 />
      <div className='border h-full bg-[#f6f7fb] flex px-[80px] py-[32px] gap-[32px]'>
        <div className='w-full h-full bg-white rounded-3xl border border-[#d9d9d9] p-[40px] flex flex-col justify-between'>
          <ProfileHeader />
          <AccuracyDisplay />
          <button
            className='px-[16px] py-[8px] bg-[#4356ff] rounded-xl border border-[#d0d4fe] self-center text-white'
            onClick={handlePlayClick}
          >
            Play
          </button>
        </div>
      </div>
    </main>
  );
}
