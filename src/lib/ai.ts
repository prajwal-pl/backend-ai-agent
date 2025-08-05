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
      data: {
        name: "Data Access",
        description: "A tool for accessing markdown data",
        execute: getRecordData,
      },
    };

    const response = streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages,
      tools,
      system: systemPrompt,
      toolChoice: "auto",
    });

    let fullResponse = "";

    for await (const part of response.textStream) {
      fullResponse += part;
      console.log(part);
    }

    return fullResponse;
  } catch (error) {
    console.log(error);
  }
};
