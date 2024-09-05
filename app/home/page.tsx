import React, { useState } from "react";

import CorrectAnswers from "../components/(Home)/(CorrectAnswers)/CorrectAnswers";
import { supabaseBrowser } from "@/lib/supabase/browser";
import NavBar2 from "../components/(ui)/(NavBars)/NavBar2";
import Gameplay from "../components/(Home)/(Gameplay)/Gameplay";
import { Settings } from "../components/(Home)/(Settings)/Settings";

const supabase = supabaseBrowser();

export default function Home() {
  return (
    <main className="flex flex-col bg-[#f6f7fb] w-dvh min-h-dvh lg:h-screen lg:min-h-0">
      <NavBar2 />
      <section className=" h-full px-[16px] lg:px-[200px] py-[16px] lg:py-[32px] gap-[16px] lg:gap-[32px] lg:flex">
        <div className="flex flex-col basis-1/3 gap-[16px] lg:gap-[32px]">
          <Gameplay />
          <Settings />
        </div>
        <CorrectAnswers />
      </section>
    </main>
  );
}
