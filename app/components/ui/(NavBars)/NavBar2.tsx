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
import { UserRound } from "lucide-react";

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
      <Link
        href="/"
        className="font-semibold text-[20px] bg-gradient-to-r from-[#4356ff] to-[#283499] bg-clip-text text-transparent"
      >
        PhysNova
      </Link>
      <div className="flex gap-2">
        <Link
          href="\bank"
          className="text-[14px] px-4 py-1 border border-[#eeeeee] rounded-xl h-fit"
        >
          Saved
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
