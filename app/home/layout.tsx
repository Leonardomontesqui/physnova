"use client";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/nav-bar";
import { BookMarked } from "lucide-react";
import Profile from "@/components/molecules/Profile";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col bg-[#f6f7fb] w-dvh min-h-dvh lg:h-screen lg:min-h-0">
      <NavBar>
        <Button asChild>
          <Link href="/bank" className="flex items-center gap-2">
            <p>Bookmarked</p>
            <BookMarked size={16} color="#5c5c5c" />
          </Link>
        </Button>
        <Profile />
      </NavBar>
      {children}
    </main>
  );
}
