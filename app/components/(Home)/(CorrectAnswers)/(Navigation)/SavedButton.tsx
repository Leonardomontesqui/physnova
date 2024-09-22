"use client";
import { fetchSavedIndexes, fetchUserID } from "@/lib/hooks/user";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
const supabase = supabaseBrowser();

interface SavedButtonProps {
  indexSet: number[];
  currentIndex: number;
}

export default function SavedButton({
  indexSet,
  currentIndex,
}: SavedButtonProps) {
  const pathname = usePathname();

  const [savedIndexes, setSavedIndexes] = useState<number[]>([]);
  const [userID, setUserID] = useState<string>();
  const [clicked, setClicked] = useState<boolean>();

  useEffect(() => {
    collectSavedIndexes();
  }, []);

  useEffect(() => {
    if (savedIndexes.length > 0) {
      updateDBSavedIndexes();
    }
  }, [pathname, userID, savedIndexes]);

  const collectSavedIndexes = async () => {
    const ID = await fetchUserID();
    setUserID(ID);

    const savedIndexes = await fetchSavedIndexes();

    if (savedIndexes != null) {
      setSavedIndexes(savedIndexes);
    }
  };

  const saveQuestion = () => {
    let questionIndex = indexSet[currentIndex];
    setClicked(true);

    if (savedIndexes?.includes(questionIndex)) {
      let indexes = savedIndexes.filter((el) => el != questionIndex);
      setSavedIndexes(indexes);
    } else {
      setSavedIndexes([...savedIndexes, questionIndex]);
    }
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
      className={`flex flex-row gap-2 items-center border border-[#d0cece] rounded px-[2px] py-[2px]${
        savedIndexes.includes(indexSet[currentIndex]) || clicked
          ? "bg-[#F7E814] text-black "
          : "bg-[#ffffff] border-[#dedede]"
      }`}
      onClick={saveQuestion}
    >
      <Bookmark size={20} strokeWidth={1.75} />
      {/* <p className="text-sm">Bookmark</p> */}
    </button>
  );
}
