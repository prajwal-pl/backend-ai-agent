import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { calculatorPrompt, weatherPrompt } from "./prompt";
import { index } from "./pinecone";

export const calculatorTool = async (input: string) => {
  console.log("Calculator tool accessed");
  const response = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: calculatorPrompt(input),
  });
  console.log("Calculator tool response:", response.text);
  return response.text;
};

export const weatherCheckerTool = async () => {
  console.log("Weather tool accessed");
  const response = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: weatherPrompt(),
  });
  return response.text;
};

export const getRecordData = async (input: string) => {
  try {
    console.log("data tool accessed");
    const response = await index.searchRecords({
      query: {
        inputs: {
          text: input,
        },
        topK: 10,
      },
      fields: ["text", "category"],
    });

    console.log(response.result.hits);

    // Extract and return the data
    const data = response.result.hits.map((hit) => ({
      text: (hit.fields as any)?.text || "",
      category: (hit.fields as any)?.category || "",
      score: hit._score || 0,
    }));

    // Return the formatted data as a string for the LLM
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Error fetching record data:", error);
  }
};
