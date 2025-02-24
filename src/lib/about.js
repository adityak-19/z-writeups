"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const writeupsDir = path.join(process.cwd(), "public/writeups");

export async function getWriteupMetadata(event) {
  try {
    const filePath = path.join(writeupsDir, event, "about.md");
    const fileContent = await fs.readFile(filePath, "utf-8");
    
    const { data } = matter(fileContent);
    
    console.log("Parsed metadata:", data); // Log metadata
    return { metadata: data };
  } catch (error) {
    console.error("Error fetching about.md:", error);
    return { error: "Failed to load about.md" };
  }
}
