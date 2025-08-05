import fs from "fs";

export const readFile = (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to read file at ${filePath}`);
  }
};
