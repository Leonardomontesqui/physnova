"use client";
import React, { useEffect, useState } from "react"; //lets try with supabase server first
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function ProfileHeader() {
  interface user {
    user_metadata: {
      picture: string;
      name: string;
    };
  }

  const [fetchError, setFetchError] = useState<string | null>(null);
  const [userData, setUserData] = useState<user | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = supabaseBrowser();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/";
      }

      if (error) {
        setFetchError("Could not fetch user");
        setUserData(null);
        console.log(error);
      }

      if (user) {
        setUserData(user);
        setFetchError(null);
        console.log("User data fetched: ", user);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {fetchError && <p className="text-black">{fetchError}</p>}
      {userData && (
        <div className="flex gap-[8px] items-center">
          <img
            src={userData.user_metadata.picture}
            alt="Picture"
            className="rounded-full w-[40px] h-[40px]"
          />
          <p>{userData.user_metadata.name}</p>
        </div>
      )}
    </div>
  );
}
