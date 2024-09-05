"use client";
import React, { useEffect } from "react";

import QuestionCard from "../components/(Question)/QuestionCard";
import { supabaseBrowser } from "@/lib/supabase/browser";
import NavBar from "../components/(ui)/(NavBars)/NavBar3";

const supabase = supabaseBrowser();

export default function Question() {
  return (
    <main className="h-screen md:h-dvh w-full flex flex-col bg-[#f6f7fb] items-center">
      <NavBar />
      <QuestionCard />
    </main>
  );
}
