"use server";

import matter from "gray-matter";
import { Octokit } from "@octokit/rest";

const DEFAULT_OWNER = 'adityak-19';
const DEFAULT_REPO = 'z-writeups';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function getWriteupMetadata(event) {
  try {
    // Use let for variables that might be reassigned
    let REPO_OWNER = DEFAULT_OWNER;
    let REPO_NAME = DEFAULT_REPO;

    try {
      const GITHUB_REPO = process.env.GITHUB_REPO || `${DEFAULT_OWNER}/${DEFAULT_REPO}`;
      [REPO_OWNER, REPO_NAME] = GITHUB_REPO.split('/');

      if (REPO_NAME === 'repo_name' || !REPO_NAME) {
        REPO_OWNER = DEFAULT_OWNER;
        REPO_NAME = DEFAULT_REPO;
      }
    } catch (error) {
      console.warn('Error parsing repo details, using defaults:', error);
    }

    console.log('Fetching metadata with:', {
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `public/writeups/${event}/about.md`
    });

    const { data: file } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `public/writeups/${event}/about.md`
    });

    const content = Buffer.from(file.content, 'base64').toString();
    const { data } = matter(content);
    
    return { metadata: data };
  } catch (error) {
    console.error("Error fetching about.md from GitHub:", error);
    return { error: "Failed to load about.md" };
  }
}
