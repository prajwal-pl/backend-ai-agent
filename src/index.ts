import express from "express";
import cors from "cors";
import { config } from "dotenv";

import agentRoutes from "./routes/agent.route";

// Load environment variables from .env file
config();

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/agent", agentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
