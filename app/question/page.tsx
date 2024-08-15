"use client";
import React, { useEffect } from "react";
import NavBar from "../components/(NavBars)/NavBar3";
import QuestionCard from "../components/(Question)/QuestionCard";
import { supabaseBrowser } from "@/lib/supabase/browser";

const supabase = supabaseBrowser();

export default function Question() {
  return (
    <main className="h-screen md:h-dvh w-full flex flex-col bg-[#f6f7fb] items-center">
      <NavBar />
      <QuestionCard />
    </main>
  );
}
