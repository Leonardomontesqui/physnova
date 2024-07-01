"use client";
import React, { useEffect } from "react";
import NavBar from "../components/(NavBars)/NavBar3";
import QuestionCard from "../components/QuestionCard";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

const supabase = supabaseBrowser();

export default function Question() {
  return (
    <main className="h-dvh w-dvw flex flex-col">
      <NavBar />
      <div className="h-full w-full bg-[#f6f7fb] py-[40px] px-[200px] overflow-y-scroll">
        <QuestionCard />
      </div>
    </main>
  );
}
