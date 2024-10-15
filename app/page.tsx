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
            Mastering IB Physics 5 questions at a time
          </div>
          <h1 className="py-1 px-4 text-white bg-amber-400 rounded-lg">
            🚧 V2 Under Construction 🚧
          </h1>
          {/* <button
            className="border bg-[#4356ff] px-[16px] py-[8px] rounded-lg text-white"
            onClick={() => handleLoginWithOAuth()}
          >
            Login with Google
          </button> */}
        </div>
        <div className="w-[300px] h-[150px] lg:w-[600px] lg:h-[300px] ">
          <iframe
            src="https://www.loom.com/embed/e55e2871b1d5446385517f411863cd4f?sid=689d0fac-6cbd-4bb9-b6fe-28b3cef1c179"
            className="w-full h-full border rounded-xl"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
