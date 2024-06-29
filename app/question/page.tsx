"use client";
import React, { useEffect } from "react";
import NavBar from "../components/NavBar3";
import QuestionCard from "../components/QuestionCard";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

const supabase = supabaseBrowser();

export default function Question() {
  // const router = useRouter();
  // useEffect(() => {
  //   verifyUser();
  // }, []);

  // const verifyUser = async () => {
  //   const { data: userData, error: userDataError } =
  //     await supabase.auth.getUser();

  //   if (!userData || userDataError) {
  //     console.error("Error fetching user data");
  //     router.push("/");
  //     return;
  //   }
  // };
  return (
    <main className="h-dvh w-dvw flex flex-col">
      <NavBar />
      <div className="h-full w-full bg-[#f6f7fb] py-[40px] px-[200px] overflow-y-scroll">
        <QuestionCard />
      </div>
    </main>
  );
}
