"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import React from "react";

export default function SignOut() {
  const handleSignOut = async () => {
    const supabase = supabaseBrowser();

    const { error } = await supabase.auth.signOut();

    window.location.href = window.location.origin;
  };

  return (
    <button className="text-[14px] items-center w-full" onClick={handleSignOut}>
      Sign out
    </button>
  );
}
