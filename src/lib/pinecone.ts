import { Pinecone } from "@pinecone-database/pinecone";
import { readFile } from "../data";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const indexName = process.env.INDEX_NAME!;
const indexHost = process.env.INDEX_HOST!;

export const index = pinecone.index(indexName, indexHost);

const record1 = readFile(
  "src/data/daext-blogging-with-markdown-complete-guide.md"
);
const record2 = readFile("src/data/john-apostol-custom-markdown-blog.md");
const record3 = readFile(
  "src/data/just-files-nextjs-blog-with-react-markdown.md"
);
const record4 = readFile(
  "src/data/webex-boosting-ai-performance-llm-friendly-markdown.md"
);
const record5 = readFile("src/data/wikipedia-lightweight-markup-language.md");

const recordData = index
  .upsertRecords([
    {
      id: "record1",
      text: record1,
      category: "blogging",
    },
    {
      id: "record2",
      text: record2,
      category: "blogging",
    },
    {
      id: "record3",
      text: record3,
      category: "blogging",
    },
    {
      id: "record4",
      text: record4,
      category: "blogging",
    },
    {
      id: "record5",
      text: record5,
      category: "blogging",
    },
  ])
  .then((response) => {
    console.log("Upserted records");
  })
  .catch((error) => {
    console.error("Error upserting records:", error);
  });

export const getRecordData = async (query: string) => {
  try {
    const response = await index.searchRecords({
      query: {
        filter: {
          text: query,
        },
        topK: 10,
      },
      fields: ["text", "category"],
    });

    console.log("Search results:", response.result.hits);
    return response.result.hits;
  } catch (error) {
    console.error("Error fetching record data:", error);
  }
};
