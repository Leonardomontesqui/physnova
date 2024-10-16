"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import NavBar from "./components/ui/(NavBars)/NavBar";

const supabase = supabaseBrowser();

export default function Landing() {
  const handleLoginWithOAuth = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback?next=/home",
      },
    });
  };

  return (
    <main className="h-dvh w-dvh flex flex-col">
      <NavBar />
      <section className="flex flex-col gap-[32px] h-full items-center justify-center px-[16px] md:px-0">
        <div className="flex flex-col items-center gap-[8px]">
          <div className="font-semibold text-[64px] lg:text-[80px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
            PhysNova
          </div>
          <div className="text-xl lg:text-2xl text-center">
            Master the IB Physics Paper 1 with Past Exam Practice
          </div>
          <button
            className="border bg-[#4356ff] px-[16px] py-[8px] rounded-lg text-white"
            onClick={() => handleLoginWithOAuth()}
          >
            Login with Google
          </button>
        </div>

        <iframe
          src="https://www.loom.com/embed/dc64d2f1bad34f369c8e7d87a9df9376?sid=078c9b50-187a-40ae-9fa8-d6d331c73e92"
          className="border rounded-xl md:w-[650px] md:h-[350px] w-[350px] h-[200px]"
        />
      </section>
    </main>
  );
}
