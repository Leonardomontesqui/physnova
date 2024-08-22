"use client";
import React from "react";
import AccuracyDisplay from "./AccuracyDisplay";

export default function Gameplay({}) {
  return (
    <div className="w-full h-full bg-white rounded-3xl border border-[#d9d9d9] p-[24px] flex flex-col items-center gap-[8px]">
      <h1 className="font-medium">Gameplay</h1>
      <AccuracyDisplay />
    </div>
  );
}
