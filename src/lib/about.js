"use server";

import matter from "gray-matter";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function getWriteupMetadata(event) {
  try {
    const { data: file } = await octokit.repos.getContent({
      owner: process.env.GITHUB_REPO.split('/')[0],
      repo: process.env.GITHUB_REPO.split('/')[1],
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
