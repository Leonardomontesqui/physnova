"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { redirect } from "next/navigation";
import React from "react";

export default function SignOut() {
  const handleSignOut = async () => {
    const supabase = supabaseBrowser();

    const { error } = await supabase.auth.signOut();

    window.location.href = window.location.origin;
  };

  return (
    <button
      className="text-[14px] px-[16px] py-[8px] border border-[#eeeeee] rounded-xl"
      onClick={handleSignOut}
    >
      Sign out
    </button>
  );
}
