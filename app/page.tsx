"use client";

import { useRouter } from "next/navigation";
import SignIn from "./components/sign-in";

import NavBar from "./components/NavBar";

export default function Landing() {
  const router = useRouter();
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
        <SignIn />
      </div>
    </main>
  );
}
