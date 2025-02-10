import React, { useState } from "react";

import CorrectAnswers from "@/components/(Home)/(CorrectAnswers)/CorrectAnswers";
import { Settings } from "@/components/(Home)/(Settings)/Settings";
import AccuracyDisplay from "@/components/(Home)/(Gameplay)/AccuracyDisplay";

export default function Home() {
  return (
    <section className=" h-full px-[16px] lg:px-[200px] py-[16px] lg:py-[32px] gap-[16px] lg:flex">
      <div className="flex flex-col basis-1/3 gap-4 ">
        <AccuracyDisplay />
        <Settings />
      </div>
      <CorrectAnswers />
    </section>
  );
}
