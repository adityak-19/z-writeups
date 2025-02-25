"use server";

import matter from "gray-matter";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Define constants
const DEFAULT_OWNER = 'adityak-19';
const DEFAULT_REPO = 'z-writeups';

// Use let instead of const since we might need to reassign
let REPO_OWNER, REPO_NAME;

try {
    const GITHUB_REPO = process.env.GITHUB_REPO || `${DEFAULT_OWNER}/${DEFAULT_REPO}`;
    [REPO_OWNER, REPO_NAME] = GITHUB_REPO.split('/');

    // If we got invalid values, use defaults
    if (REPO_NAME === 'repo_name' || !REPO_NAME) {
        REPO_OWNER = DEFAULT_OWNER;
        REPO_NAME = DEFAULT_REPO;
    }
} catch (error) {
    REPO_OWNER = DEFAULT_OWNER;
    REPO_NAME = DEFAULT_REPO;
}

console.log('Final GitHub Parameters:', {
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: "writeups"
});

const CACHE_DURATION = 60 * 60 * 1000; // Increase cache to 1 hour

// Add memory cache
const MEMORY_CACHE = new Map();

// Update the base path to match your repository structure
const BASE_PATH = "public/writeups"; // Changed from "writeups"

console.log('GitHub API Request:', {
  owner: REPO_OWNER,
  repo: REPO_NAME,
  path: BASE_PATH
});

export async function getWriteups() {
  try {
    // Check memory cache first
    const cacheKey = `${REPO_OWNER}/${REPO_NAME}`;
    if (MEMORY_CACHE.has(cacheKey)) {
      const { data, timestamp } = MEMORY_CACHE.get(cacheKey);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }

    // Fetch in parallel
    const { data: contents } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: BASE_PATH
    });

    // Fetch all events in parallel
    const writeups = {};
    await Promise.all(contents.map(async (event) => {
      if (event.type !== "dir") return;

      const [aboutFile, categories] = await Promise.all([
        octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: `public/writeups/${event.name}/about.md`
        }),
        octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: `public/writeups/${event.name}`
        })
      ]);

      const aboutContent = Buffer.from(aboutFile.data.content, 'base64').toString();
      const { data: eventData } = matter(aboutContent);

      writeups[event.name] = {
        metadata: eventData,
        categories: {}
      };

      // Fetch all categories in parallel
      await Promise.all(categories.data.map(async (category) => {
        if (category.type !== "dir" || ["assets", "images"].includes(category.name)) return;

        const { data: files } = await octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: `public/writeups/${event.name}/${category.name}`
        });

        writeups[event.name].categories[category.name] = [];

        // Fetch all writeups in parallel
        await Promise.all(files.map(async (file) => {
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
        }));
      }));
    }));

    // Update memory cache
    MEMORY_CACHE.set(cacheKey, {
      data: writeups,
      timestamp: Date.now()
    });

    return writeups;
  } catch (error) {
    console.error('Error fetching writeups:', error);
    const cachedData = MEMORY_CACHE.get(`${REPO_OWNER}/${REPO_NAME}`);
    if (cachedData) {
      return cachedData.data;
    }
    throw error;
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
