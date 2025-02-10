import React from "react";
import { topics } from "@/constants/topics";
import { insertMockSettings } from "@/lib/hooks/user";
const questionAmount: number[] = [2, 5, 3, 5, 5, 2, 4, 2, 2];
const topicsCopy = [...topics];
topicsCopy.push("Random");
import { useRouter } from "next/navigation";

export default function MockOption() {
  const router = useRouter();
  return (
    <>
      <p className="text-sm font-medium">30 Questions</p>
      <ul className="list-disc list-inside">
        {topicsCopy.map((topic, index) => (
          <li key={topic} className="text-sm">
            {questionAmount[index]} - {topic}
          </li>
        ))}
      </ul>

      <button
        className="absolute bottom-4 px-5 py-1 bg-white rounded-xl border-2 border-[#4356ff] self-center text-[#4356ff] font-medium text-[16px] hover:bg-[#4356ff] hover:text-white"
        onClick={async () => {
          await insertMockSettings();
          router.push("/question");
        }}
      >
        Play
      </button>
    </>
  );
}
