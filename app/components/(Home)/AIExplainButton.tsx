import { CircleHelp } from "lucide-react";
import React, { useState } from "react";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleAIFileManager } from "@google/generative-ai/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

interface AIExplainButtonParameters {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  diagramDescription: string;
  setShowExplanation: (show: boolean) => void;
  setExplanation: (explanation: string) => void;
  showExplanation: boolean;
}

const AIExplainButton: React.FC<AIExplainButtonParameters> = ({
  question,
  userAnswer,
  correctAnswer,
  diagramDescription,
  setShowExplanation,
  setExplanation,
  showExplanation,
}) => {
  const [loading, setLoading] = useState(false);

  const [explanationCache, setExplanationCache] = useState<
    Record<string, string>
  >({});

  const fetchExplanation = async (question: string, userAnswer: string) => {
    try {
      setLoading(true);

      const prompt = `Explain why ${correctAnswer} is the correct answer to the following question is correct and if the user's selected answer is wrong, explain why it is wrong. If there is a diagram in the question consider the diagram in your explanation. Use a maximum of 500 words and prioritize equations when possible. Question: ${question}. User's Answer: ${userAnswer}. diagram description: ${diagramDescription}. This setup is commonly used to represent scenarios involving collisions or interactions between moving objects and stationary surfaces in physics problems.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setExplanationCache((prevCache) => ({
        ...prevCache,
        [question]: text,
      }));

      setExplanation(text);
      setShowExplanation(true);
    } catch (error) {
      console.error("Error fetching explanation:", error);
      setExplanation("Failed to fetch explanation. Please try again.");
      setShowExplanation(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (showExplanation) {
      setShowExplanation(false);
    } else if (explanationCache[question]) {
      setExplanation(explanationCache[question]);
      setShowExplanation(true);
    } else {
      fetchExplanation(question, userAnswer);
    }
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
    </div>
  );
};
export default AIExplainButton;
