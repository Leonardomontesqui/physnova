"use client";
import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";
import Logo from "./components/Logo";

export default function Home() {
  const router = useRouter();
  return (
    <main className="h-screen flex flex-col">
      <Logo />
      <button onClick={() => router.push("/login")}>Login</button>
      <button onClick={() => router.push("/")}>Sign Up</button>
    </main>
  );
}
