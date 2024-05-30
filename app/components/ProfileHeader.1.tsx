'use client';
import React, {useEffect, useState} from 'react'; //lets try with supabase server first
import {supabaseBrowser} from '@/lib/supabase/browser';
import {useRouter} from 'next/navigation';

export default function ProfileHeader() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [userPictureUrl, setUserPictureUrl] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = supabaseBrowser();

      const {
        data: {user},
        error,
      } = await supabase.auth.getUser();

      if (error) {
        setFetchError('Could not fetch user');
        console.error(error);
      }

      if (!user) {
        router.push('/');
      }

      setUserPictureUrl(user?.user_metadata.picture);
      setUserName(user?.user_metadata.name);
      setFetchError(null);
      console.log('User data fetched: ', user);
    };

    fetchUser();
  }, []);

  return (
    <div>
      {/* @Leonardomontesqui look into react-hot-toaster or shadcn toaster */}
      {fetchError && <p className='text-black'>{fetchError}</p>}
      {userPictureUrl && userName && (
        <div className='flex gap-[8px] items-center'>
          <img
            src={userPictureUrl}
            alt='Picture'
            className='rounded-full w-[40px] h-[40px]'
          />
          <p>{userName}</p>
        </div>
      )}
    </div>
  );
}
