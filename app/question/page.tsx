"use client";
import React from "react";
import QuestionCard from "@/components/(Question)/QuestionCard";
import NavBar from "@/components/ui/nav-bar";
import { Button } from "@/components/ui/button";

export default function Question() {
  return (
    <main className="h-screen md:h-dvh w-full flex flex-col bg-[#f6f7fb] items-center">
      <NavBar>
        <Button onClick={() => (window.location.href = "/home")}>Exit</Button>
      </NavBar>
      <QuestionCard />
    </main>
  );
}
