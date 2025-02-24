"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const writeupsDir = path.join(process.cwd(), "public/writeups");

export async function getWriteups() {
  let writeups = {};

  try {
    const events = await fs.readdir(writeupsDir);
    for (const event of events) {
      const eventPath = path.join(writeupsDir, event);
      const stat = await fs.stat(eventPath);
      if (!stat.isDirectory()) continue;

      writeups[event] = {};

      const categories = await fs.readdir(eventPath);
      for (const category of categories) {
        const categoryPath = path.join(eventPath, category);
        const categoryStat = await fs.stat(categoryPath);
        if (!categoryStat.isDirectory() || category === "images" || category === "assets") continue; // Skip images folder

        writeups[event][category] = [];

        const files = await fs.readdir(categoryPath);
        for (const file of files) {
          if (file.endsWith(".md")) {
            const filePath = path.join(categoryPath, file);
            const fileContent = await fs.readFile(filePath, "utf-8");
            const { data, content } = matter(fileContent);

            const imagePath = data.image ? `/writeups/${event}/images/${path.basename(data.image)}` : null;

            writeups[event][category].push({
              slug: file.replace(".md", ""),
              content,
              ...data,
              image: imagePath,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error loading writeups:", error);
  }

  return writeups;
}
