"use client";

import { GoogleIcon } from "@/components/molecules/GoogleLogo";
import { Button } from "@/components/ui/button";
import { handleLoginWithOAuth } from "@/lib/hooks/user"; // check if this works or nah
import NavBar from "@/components/ui/nav-bar";
import Hero from "@/components/(Landing)/Hero";

export default function Landing() {
  return (
    <main className="h-dvh w-full flex flex-col overflow-x-hidden ">
      <NavBar>
        <Button>
          <a href="mailto: leo.mq06@gmail.com">Contact</a>
        </Button>
      </NavBar>
      <section className="flex flex-col items-center py-4 px-4 md:px-0 overflow-y-scroll w-full md:my-auto gap-6 overflow-x-hidden ">
        <Hero />
        <Button
          onClick={() => handleLoginWithOAuth()}
          variant={"cta"}
          size={"lg"}
        >
          <GoogleIcon />
          <p>Login with Google</p>
        </Button>
        <iframe
          src="https://www.loom.com/embed/dc64d2f1bad34f369c8e7d87a9df9376?sid=078c9b50-187a-40ae-9fa8-d6d331c73e92"
          className="border rounded-xl md:w-[650px] md:h-[350px] w-[350px] h-[200px]"
        />
      </section>
    </main>
  );
}
