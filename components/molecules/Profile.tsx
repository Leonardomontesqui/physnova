"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRound } from "lucide-react";
import SignOut from "../(Shared)/SignOut";
import { fetchUserPicture } from "@/lib/hooks/user";

export default function Profile() {
  const [userPic, setUserPic] = useState<string>();
  useEffect(() => {
    fetchUserPicture().then((data) => setUserPic(data));
  }, []);

  return (
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
  );
}
