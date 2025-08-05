import { Request, Response } from "express";
import { messageGenerator } from "../lib/ai";

export const messageHandler = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Message is required.",
      });
    }

    const response = await messageGenerator(message);
    console.log(response);

    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while processing your request.",
    });
  }
};
