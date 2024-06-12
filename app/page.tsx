'use client';
<<<<<<< Updated upstream

import {supabaseBrowser} from '@/lib/supabase/browser';
import NavBar from './components/NavBar';

=======
import {supabaseBrowser} from '@/lib/supabase/browser';
import NavBar from './components/NavBar';
>>>>>>> Stashed changes
const supabase = supabaseBrowser();

export default function Landing() {
  const handleLoginWithOAuth = async () => {
<<<<<<< Updated upstream
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback?next=/home',
=======
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/home`,
>>>>>>> Stashed changes
      },
    });
  };

  return (
    <main className='h-dvh w-dvh flex flex-col gap-[150px]'>
      <NavBar />
      <div className='flex flex-col items-center gap-[20px]'>
        <div className='flex flex-col items-center'>
<<<<<<< Updated upstream
          <div className='font-s`emibold text-[89.76px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent'>
=======
          <div className='font-semibold text-[89.76px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent'>
>>>>>>> Stashed changes
            PhysNova
          </div>
          <div className='text-3xl'>
            Mastering IB Physics 5 questions at a time
          </div>
        </div>
        <button
          className='border bg-[#4356ff] px-[16px] py-[8px] rounded-lg text-white'
          onClick={() => handleLoginWithOAuth()}
        >
          Login with Google
        </button>
      </div>
    </main>
  );
}
