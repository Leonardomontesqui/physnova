import { CircleHelp } from "lucide-react";
import React, { useState } from "react";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export default function AIExplainButton({
  question,
  userAnswer,
}: {
  question: string;
  userAnswer: string;
}) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async (question: string, userAnswer: string) => {
    try {
      setLoading(true);

      const prompt = `Explain why the correct answer to the following question is correct and why the user's selected answer is wrong. Question: ${question}. User's Answer: ${userAnswer}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setExplanation(text);
    } catch (error) {
      console.error("Error fetching explanation:", error);
      setExplanation("Failed to fetch explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    fetchExplanation(question, userAnswer);
  };

  return (
    <div>
      <button
        className="border border-[#d0cece] rounded px-[2px] py-[2px] flex items-center"
        onClick={handleClick}
        disabled={loading}
      >
        <CircleHelp size={20} />
        {loading ? "Loading..." : "Explain"}
      </button>
      {explanation && (
        <div className="mt-2 p-2 border rounded bg-[#f0f0f0]">
          {explanation}
        </div>
      )}
    </div>
  );
}
