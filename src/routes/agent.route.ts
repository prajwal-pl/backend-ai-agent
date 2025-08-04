import express from "express";
import { messageHandler } from "../controllers/agent.controller";

const router = express.Router();

router.post("/message", messageHandler);

export default router;
