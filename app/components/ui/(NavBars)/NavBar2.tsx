"use client";
import React, { useEffect, useState } from "react";
import SignOut from "../../(Shared)/SignOut";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { fetchUserPicture } from "@/lib/hooks/user";
import { BookMarked, LibraryBig, UserRound } from "lucide-react";

export default function NavBar() {
  const [userPic, setUserPic] = useState<string>();
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const userPicture = await fetchUserPicture();
    console.log(userPicture);
    setUserPic(userPicture);
    return;
  };
  return (
    <header className="sticky top-0 z-50 bg-white w-full px-[16px] lg:px-[200px] py-[8px] flex justify-between border border-b-[#dedede] items-center">
      <div className="flex gap-4 items-center">
        <Link
          href="/"
          className="font-semibold text-[20px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent"
        >
          PhysNova
        </Link>
      </div>

      <div className="flex gap-2">
        <Link
          href="\bank"
          className="flex items-center py-1 px-2 border border-[#dedede] rounded-xl gap-1"
        >
          <p className="text-sm">Bookmarked</p>
          <BookMarked size={16} color="#5c5c5c" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userPic} alt="@shadcn" />
              <AvatarFallback>
                <UserRound size={20} strokeWidth={1.75} />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
