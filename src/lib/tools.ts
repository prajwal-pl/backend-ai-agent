import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { calculatorPrompt, weatherPrompt } from "./prompt";
import { index } from "./pinecone";

export const calculatorTool = async (input: string) => {
  const response = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: calculatorPrompt(input),
  });
  console.log("Weather tool accessed");
  return response.text;
};

export const weatherCheckerTool = async () => {
  const response = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: weatherPrompt(),
  });
  console.log("Calculator tool accessed");
  return response.text;
};

export const getRecordData = async (query: string) => {
  try {
    console.log("data tool accessed");
    const response = await index.searchRecords({
      query: {
        inputs: {
          query: query,
        },
        topK: 2,
      },
      fields: ["text", "category"],
    });

    // const data = response.result.hits.map((hit) => ({
    //     text: hit.fields?.text || "",
    //     category: hit.fields?.category || "",
    // }));

    console.log("Search results:", response.result.hits);
    // return data;
  } catch (error) {
    console.error("Error fetching record data:", error);
  }
};
