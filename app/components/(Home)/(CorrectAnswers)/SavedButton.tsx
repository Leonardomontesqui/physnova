"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Bookmark } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const supabase = supabaseBrowser();

export default function SavedButton({
  indexSet,
  currentIndex,
}: {
  indexSet: number[];
  currentIndex: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [savedIndexes, setSavedIndexes] = useState<number[]>([]);
  const [userID, setUserID] = useState<string>();

  useEffect(() => {
    fetchSavedIndexes();
  }, []);

  useEffect(() => {
    if (userID && savedIndexes.length > 0) {
      updateDBSavedIndexes();
    }
  }, [pathname, userID, savedIndexes]);

  const fetchSavedIndexes = async () => {
    const { data: userData, error: userDataError } =
      await supabase.auth.getUser();

    if (!userData || userDataError) {
      console.error("Following error fetching user data: ", userDataError);
      return;
    }

    setUserID(userData.user.id);
    console.log(userID);

    const { data: DBsavedIndexesObject, error: DBsavedIndexesError } =
      await supabase
        .from("profiles")
        .select("savedIndexes")
        .eq("id", userData.user.id);

    if (DBsavedIndexesError) {
      console.error(
        "Following error fetching saved Indexes ",
        DBsavedIndexesError
      );
    }

    if (DBsavedIndexesObject != null) {
      setSavedIndexes(DBsavedIndexesObject[0].savedIndexes);
    }
  };

  const saveQuestion = async () => {
    let questionIndex = indexSet[currentIndex];

    if (savedIndexes?.includes(questionIndex)) {
      let indexes = savedIndexes.filter((el) => el != questionIndex);
      setSavedIndexes(indexes);
    } else {
      setSavedIndexes([...savedIndexes, questionIndex]);
    }
    console.log(
      "This is the saved Index list prior to sending it: ",
      savedIndexes
    );
  };

  const updateDBSavedIndexes = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ savedIndexes: savedIndexes })
      .eq("id", userID)
      .select();

    if (error) {
      console.log("Following error updating the saved Indexes ", error);
    }
  };

  return (
    <button
      className={`border border-[#d0cece] rounded px-[2px] py-[2px] ${
        savedIndexes.includes(indexSet[currentIndex])
          ? "bg-gray-200 text-black border border-[#eeefe]"
          : "bg-[#ffffff] border-[#dedede]"
      }`}
      onClick={saveQuestion}
    >
      <Bookmark size={20} />
    </button>
  );
}
