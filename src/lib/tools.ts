import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { calculatorPrompt, weatherPrompt } from "./prompt";

export const calculatorTool = async (input: string) => {
  const response = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: calculatorPrompt(input),
  });
  return response.text;
};

export const weatherCheckerTool = async () => {
  const response = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: weatherPrompt(),
  });
  return response.text;
};
