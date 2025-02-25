import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function fetchContent(path) {
  try {
    const response = await octokit.repos.getContent({
      owner: process.env.GITHUB_REPO.split('/')[0],
      repo: process.env.GITHUB_REPO.split('/')[1],
      path,
    });
    
    return Buffer.from(response.data.content, 'base64').toString();
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
} 