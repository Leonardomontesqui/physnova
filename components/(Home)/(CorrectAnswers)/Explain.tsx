import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

interface ExplainProps {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  diagramDescription: string;
  triggerFetchExplanation: boolean; // Prop to trigger fetch
  explanation: string;
  setExplanation: (text: string) => void;
  currentIndex: number;
  explanationCache: Record<number, string>;
  setExplanationCache: (
    cache: (prevCache: Record<number, string>) => Record<number, string>
  ) => void;
}

export default function Explain({
  question,
  userAnswer,
  correctAnswer,
  diagramDescription,
  triggerFetchExplanation,
  explanation,
  setExplanation,
  currentIndex,
  explanationCache,
  setExplanationCache,
}: ExplainProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // const [explanationCache, setExplanationCache] = useState<
  //   Record<number, string>
  // >({});

  React.useEffect(() => {
    if (triggerFetchExplanation) {
      fetchExplanation();
    }
  }, [triggerFetchExplanation, currentIndex]);

  // Fetch explanation logic is called when button is clicked
  const fetchExplanation = async () => {
    if (currentIndex in explanationCache) {
      setExplanation(explanationCache[currentIndex]);
      return;
    } else {
      setLoading(true);
      setError(false);

      try {
        const prompt = `Explain why ${correctAnswer} is 
      the correct answer to the following question. If there is a diagram in the question, consider the diagram or diagram description in your explanation. 
      Use a maximum of 400 words and prioritize equations when possible. Question: ${question}. Diagram description: ${diagramDescription}.`; //you can also pass the usersAnswer to compare but too much hassle

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        setExplanationCache((prevCache) => ({
          ...prevCache,
          [currentIndex]: text, // Use bracket notation to set the value for the key currentIndex
        }));
        setExplanation(text);
      } catch (err) {
        console.error("Error fetching explanation:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="skeleton-loader">Loading explanation...</div>;
  }

  if (error) {
    return <div>Error fetching explanation. Please try again later.</div>;
  }

  return (
    <ReactMarkdown
      className="text-sm"
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
    >
      {explanation || "No explanation available"}
    </ReactMarkdown>
  );
}
