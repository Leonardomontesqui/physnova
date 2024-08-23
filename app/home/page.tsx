import { Settings } from "./../components/(Home)/Settings";

import React, { useState } from "react";
import NavBar2 from "../components/(NavBars)/NavBar2";
import { useRouter } from "next/navigation"; //FROM NEXT NAVIGATION
import AccuracyDisplay from "../components/(Home)/AccuracyDisplay";
import CorrectAnswers from "../components/(Home)/CorrectAnswers";
import TopicsBox from "../components/(Home)/TopicsBox";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Gameplay from "../components/(Home)/Gameplay";

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
