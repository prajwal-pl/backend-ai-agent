import { groq } from "@ai-sdk/groq";
import { embed, ModelMessage, streamText, ToolSet } from "ai";
import { calculatorTool, getRecordData, weatherCheckerTool } from "./tools";
import { systemPrompt } from "./prompt";
import { z } from "zod";

export const messageGenerator = async (input: string) => {
  try {
    const messages: ModelMessage[] = [];

    messages.push({
      role: "user",
      content: input,
    });

    let calculatorResponse = "";
    let weatherResponse = "";
    let dataResponse = "";

    const tools: ToolSet = {
      weatherChecker: {
        description: "A tool for checking weather",
        execute: async () => {
          weatherResponse = await weatherCheckerTool();
        },
        type: "function",
      },
      calculator: {
        description:
          "A tool for performing calculations with generic mathematical questions",
        inputSchema: z.object({
          query: z
            .string()
            .describe("The mathematical expression to calculate"),
        }),
        execute: async ({ query }) => {
          calculatorResponse = await calculatorTool(query);
        },
        type: "function",
      },
      dataAccess: {
        description: "A tool for accessing data based on user input",
        inputSchema: z.object({
          query: z.string().describe("The query to search for data"),
        }),
        execute: async ({ query }) => {
          dataResponse = getRecordData(query);
        },
        type: "function",
      },
    };

    const response = streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages,
      tools,
      toolChoice: "auto",
      system: systemPrompt,
    });

    let fullResponse = "";

    for await (const part of response.textStream) {
      fullResponse += part;
      console.log(part);
    }

    return { fullResponse, calculatorResponse, weatherResponse, dataResponse };
  } catch (error) {
    console.log(error);
  }
};
