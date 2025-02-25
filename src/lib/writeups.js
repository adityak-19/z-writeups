"use server";

import matter from "gray-matter";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const REPO_OWNER = process.env.GITHUB_REPO.split('/')[0];
const REPO_NAME = process.env.GITHUB_REPO.split('/')[1];
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

let cache = {
  data: null,
  timestamp: 0
};

export async function getWriteups() {
  try {
    // Check cache
    if (cache.data && Date.now() - cache.timestamp < CACHE_DURATION) {
      return cache.data;
    }

    let writeups = {};

    // Fetch content from GitHub
    const { data: contents } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: "public/writeups"
    });

    for (const event of contents) {
      if (event.type !== "dir") continue;

      // Get event metadata
      const { data: aboutFile } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: `public/writeups/${event.name}/about.md`
      });

      const aboutContent = Buffer.from(aboutFile.content, 'base64').toString();
      const { data: eventData } = matter(aboutContent);

      writeups[event.name] = {
        metadata: eventData,
        categories: {}
      };

      // Get categories
      const { data: categories } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: `public/writeups/${event.name}`
      });

      for (const category of categories) {
        if (category.type !== "dir" || ["assets", "images"].includes(category.name)) continue;

        writeups[event.name].categories[category.name] = [];

        // Get writeups in category
        const { data: files } = await octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: `public/writeups/${event.name}/${category.name}`
        });

        for (const file of files) {
          if (file.type === "file" && file.name.endsWith(".md")) {
            const { data: writeupFile } = await octokit.repos.getContent({
              owner: REPO_OWNER,
              repo: REPO_NAME,
              path: `public/writeups/${event.name}/${category.name}/${file.name}`
            });

            const content = Buffer.from(writeupFile.content, 'base64').toString();
            const { data, content: markdown } = matter(content);

            writeups[event.name].categories[category.name].push({
              slug: file.name.replace(".md", ""),
              content: markdown,
              ...data,
              category: category.name,
              event: event.name
            });
          }
        }
      }
    }

    // Update cache
    cache = {
      data: writeups,
      timestamp: Date.now()
    };

    return writeups;
  } catch (error) {
    console.error("Error fetching from GitHub:", error);
    return {};
  }
}

// Add caching to prevent hitting GitHub API rate limits
let cachedWriteups = null;
let lastFetchTime = 0;

export async function getCachedWriteups() {
  const now = Date.now();
  if (!cachedWriteups || now - lastFetchTime > CACHE_DURATION) {
    cachedWriteups = await getWriteups();
    lastFetchTime = now;
  }
  return cachedWriteups;
}
