"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import NavBar from "./components/(NavBars)/NavBar";
const supabase = supabaseBrowser();

export default function Landing() {
  const handleLoginWithOAuth = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback?next=/home", // This is what used to be "/auth/callback?next=/home"
      },
    });
  };

  return (
    <main className="h-dvh w-dvh flex flex-col">
      <NavBar />
      <div className="flex flex-col gap-[32px] h-full items-center justify-center">
        <div className="flex flex-col items-center gap-[8px]">
          <div className="font-semibold text-[89.76px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent">
            PhysNova
          </div>
          <div className="text-3xl">
            Mastering IB Physics 5 questions at a time
          </div>
          <button
            className="border bg-[#4356ff] px-[16px] py-[8px] rounded-lg text-white"
            onClick={() => handleLoginWithOAuth()}
          >
            Login with Google
          </button>
        </div>
        <iframe
          className="rounded-xl h-[400px] w-[600px] border"
          src="https://www.loom.com/embed/be0684fa2f384aecba74000a180517f2?sid=6cc8af92-957b-4a19-b123-5cfd9cc4fb12"
        />
      </div>
    </main>
  );
}
