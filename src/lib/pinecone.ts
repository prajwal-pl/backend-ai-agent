import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const indexName = process.env.INDEX_NAME!;
const indexHost = process.env.INDEX_HOST!;

const index = pinecone.index(indexName, indexHost);

index
  .upsertRecords([
    {
      _id: "record1",
      chunk_text: "",
    },
  ])
  .then((response) => {
    console.log("Upserted records:", response);
  })
  .catch((error) => {
    console.error("Error upserting records:", error);
  });
