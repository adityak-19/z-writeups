import matter from "gray-matter";
import fs from "fs";
import path from "path";

export function getPosts() {
  const postsDirectory = path.join(process.cwd(), "public/posts");
  const posts = [];

  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [
      {
        slug: "coming-soon",
        content: "Blog posts coming soon!",
        title: "Coming Soon",
        date: new Date().toISOString()
      }
    ];
  }

  // Get all files from the posts directory
  const files = fs.readdirSync(postsDirectory);

  // Process each markdown file
  files.forEach((fileName) => {
    if (!fileName.endsWith(".md")) return;

    // Read file content
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Parse frontmatter and content
    const { data, content } = matter(fileContent);

    // Add post data
    posts.push({
      slug: fileName.replace(".md", ""),
      content,
      title: data.title,
      date: data.date,
      image: data.image
    });
  });

  // Sort posts by date
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
