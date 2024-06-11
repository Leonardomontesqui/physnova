"use client";
import React, { useEffect, useState } from "react"; //lets try with supabase server first
import { supabaseBrowser } from "@/lib/supabase/browser";
const supabase = supabaseBrowser();
import { useRouter } from "next/navigation";

export default function ProfileHeader() {
  const router = useRouter();
  const [userPictureUrl, setUserPictureUrl] = useState<string>();
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
        error: userDataError,
      } = await supabase.auth.getUser();

      if (userDataError) {
        console.error("Error in fetching user data");
      }

      if (!user) {
        router.push("/");
      }

      setUserName(user?.user_metadata.name);
      setUserPictureUrl(user?.user_metadata.picture);
      // console.log("User data fetched: ", user);
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      {userPictureUrl && userName && (
        <div className="flex gap-[8px] items-center">
          <img
            src={userPictureUrl}
            alt="Profile picture"
            className="rounded-full w-[40px] h-[40px]"
          />
          <p>{userName}</p>
        </div>
      )}
    </div>
  );
}
