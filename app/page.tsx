"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import NavBar from "./components/ui/(NavBars)/NavBarX";
import Hero from "./components/(Landing)/Hero";

const supabase = supabaseBrowser();

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0,0,256,256"
    >
      <g
        fill="#ffffff"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
      >
        <g transform="scale(10.66667,10.66667)">
          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315 -2.647,3.972 -5.445,3.972c-3.332,0 -6.033,-2.701 -6.033,-6.032c0,-3.331 2.701,-6.032 6.033,-6.032c1.498,0 2.866,0.549 3.921,1.453l2.814,-2.814c-1.777,-1.619 -4.141,-2.607 -6.735,-2.607c-5.524,0 -10.002,4.477 -10.002,10c0,5.523 4.478,10 10.002,10c8.396,0 10.249,-7.85 9.426,-11.748z"></path>
        </g>
      </g>
    </svg>
  );
}

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
    <main className="h-dvh w-full flex flex-col overflow-x-hidden ">
      <NavBar />
      <section className="flex flex-col items-center py-4 px-4 md:px-0 overflow-y-scroll w-full md:my-auto gap-6 overflow-x-hidden ">
        <Hero />
        <button
          className="border bg-[#4356ff] px-4 py-2 rounded-xl text-white flex items-center gap-2"
          onClick={() => handleLoginWithOAuth()}
        >
          <GoogleIcon />
          <p>Login with Google</p>
        </button>
        <iframe
          src="https://www.loom.com/embed/dc64d2f1bad34f369c8e7d87a9df9376?sid=078c9b50-187a-40ae-9fa8-d6d331c73e92"
          className="border rounded-xl md:w-[650px] md:h-[350px] w-[350px] h-[200px]"
        />
      </section>
    </main>
  );
}
