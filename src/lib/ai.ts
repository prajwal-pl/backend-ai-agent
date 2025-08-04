import { groq } from "@ai-sdk/groq";
import { embed, ModelMessage, streamText, ToolSet } from "ai";
import { calculatorTool, weatherCheckerTool } from "./tools";

export const messageGenerator = async (input: string) => {
  try {
    const messages: ModelMessage[] = [];

    messages.push({
      role: "user",
      content: input,
    });

    const tools: ToolSet = {
      weatherChecker: {
        name: "Weather Checker",
        description: "A tool for checking weather",
        execute: weatherCheckerTool,
      },
      calculator: {
        name: "Calculator",
        description: "A tool for performing calculations",
        execute: calculatorTool,
      },
    };

    const response = streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages,
      tools,
      toolChoice: "required",
    });

    let fullResponse = "";

    for await (const part of response.textStream) {
      fullResponse += part;
      console.log(part);
    }

    const { embedding } = await embed({
      model: groq.textEmbeddingModel("llama-3.3-70b-versatile"),
      value: fullResponse,
    });

    return { fullResponse, embedding };
  } catch (error) {
    console.log(error);
  }
};
