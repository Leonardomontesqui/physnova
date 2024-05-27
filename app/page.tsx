"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import NavBar from "./components/NavBar";

export default function Landing() {
  const handleLoginWithOAuth = async (provider: "google") => {
    const supabase = supabaseBrowser();

    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback?next=/home",
      },
    });
  };

  return (
    <main className="h-dvh w-dvh flex flex-col gap-[150px]">
      <NavBar />
      <div className="flex flex-col items-center gap-[20px]">
        <div className="flex flex-col items-center">
          <div className="font-semibold text-[89.76px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
            PhysNova
          </div>
          <div className="text-[37.9px]">
            Mastering IB Physics 5 questions at a time
          </div>
        </div>
        <button
          className="border bg-[#4356ff] px-[16px] py-[8px] rounded-lg text-white"
          onClick={() => handleLoginWithOAuth("google")}
        >
          Login with Google
        </button>
      </div>
    </main>
  );
}
