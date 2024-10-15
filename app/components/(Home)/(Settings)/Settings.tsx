"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import CustomOption from "./CustomOption";
import MockOption from "./MockOption";

const supabase = supabaseBrowser();

export function Settings() {
  return (
    <div className="relative h-[466px] w-full bg-white rounded-2xl border border-[#d9d9d9] p-4 flex flex-col  gap-[8px]">
      <h1 className="font-medium">Settings</h1>
      <Tabs defaultValue="custom" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="custom" className="w-full ">
            Custom
          </TabsTrigger>
          <TabsTrigger value="mock" className="w-full">
            Mock
          </TabsTrigger>
        </TabsList>
        <TabsContent value="custom" className="flex flex-col gap-2">
          <CustomOption />
        </TabsContent>
        <TabsContent value="mock" className="flex flex-col gap-2">
          <MockOption />
        </TabsContent>
      </Tabs>
    </div>
  );
}
