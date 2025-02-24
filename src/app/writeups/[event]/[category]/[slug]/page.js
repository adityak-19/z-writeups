"use client";

import { useEffect, useState, use } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
import { getWriteups } from "../../../../../lib/writeups";

export default function Writeup({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const event = decodeURIComponent(params.event);
  const category = decodeURIComponent(params.category);
  const slug = decodeURIComponent(params.slug);

  const [writeup, setWriteup] = useState(null);
  const [writeups, setWritups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWriteup() {
      try {
        const fetchedWriteups = await getWriteups();
        setWritups(fetchedWriteups);
        
        // Helper function to normalize strings for comparison
        const normalize = (str) => str
          .replace(/_/g, ' ')
          .replace(/-/g, ' ')
          .toUpperCase()
          .trim();

        // Find the original category
        const normalizedSearchCategory = normalize(category);
        const originalCategory = Object.keys(fetchedWriteups[event]).find(
          key => normalize(key) === normalizedSearchCategory
        );

        console.log("Original category from data:", originalCategory);
        const categoryWriteups = fetchedWriteups[event]?.[originalCategory] || [];
        
        // Find the writeup using normalized comparison
        const foundWriteup = categoryWriteups.find(w => 
          normalize(w.slug) === normalize(slug)
        );
        
        console.log("All slugs in category:", categoryWriteups.map(w => w.slug));
        console.log("Looking for slug:", slug);
        console.log("Found writeup:", foundWriteup);
        
        setWriteup(foundWriteup || null);
      } catch (error) {
        console.error("Error fetching writeup:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWriteup();
  }, [event, category, slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-foreground font-mono flex items-center justify-center">
        <p className="text-green-500 text-xl animate-pulse">Loading...</p>
      </main>
    );
  }

  if (!writeup) {
    return (
      <main className="min-h-screen bg-black text-foreground font-mono p-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href={`/writeups/${event}`}
            className="text-green-500 hover:text-green-400 mb-8 inline-block"
          >
            ← Back to Event
          </Link>
          <p className="text-2xl text-gray-400">Writeup not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0a192f] text-foreground font-mono relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="flex justify-center relative z-10">
        {/* Main Content - Centered with max-width constraints */}
        <div className="w-full max-w-4xl px-4 py-12">  {/* Centered with max width */}
          <Link 
            href={`/writeups/${event}`}
            className="text-green-500 hover:text-green-400 mb-8 inline-block"
          >
            ← Back to Event
          </Link>

          {/* Date */}
          <div className="text-gray-400 mb-4">{writeup.date}</div>

          {/* Title */}
          <h1 className="text-green-500 text-3xl font-bold">{writeup.title}</h1>

          {/* Event, Category, Difficulty Tags Below Title */}
          <div className="flex flex-wrap gap-2 mt-3 mb-8">
            <span className="px-3 py-1 rounded-md text-sm bg-gray-800/80 backdrop-blur-sm text-gray-300">
              📅 {writeup.event}
            </span>
            <span className="px-3 py-1 rounded-md text-sm bg-gray-800/80 backdrop-blur-sm text-blue-300">
              🔎 {writeup.category}
            </span>
            <span className="px-3 py-1 rounded-md text-sm bg-gray-800/80 backdrop-blur-sm text-green-300">
              🎯 {writeup.difficulty}
            </span>
          </div>

          {/* Authors */}
          {writeup.authors?.length > 0 && (
            <div className="flex items-center space-x-4 mb-8">
              {writeup.authors.map((author, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-white">{author.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Introduction */}
          {writeup.introduction && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">{writeup.introduction}</h2>
              <p className="text-gray-300">{writeup.introduction}</p>
            </div>
          )}

          {/* Tags */}
          {writeup.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {writeup.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-md text-sm bg-green-500/20 text-green-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Table of Contents */}
          {writeup.tableOfContents?.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Table of Contents</h2>
              <div className="text-green-500">
                {writeup.tableOfContents.map((item, index) => (
                  <a key={index} href={`#${item.anchor}`} className="block hover:underline">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-invert max-w-full">  {/* Added max-w-full */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img({ node, ...props }) {
                  return (
                    <div className="w-full px-4 sm:px-6 lg:px-8 my-8"> {/* Responsive padding */}
                      <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto"> {/* Responsive max-width */}
                        <div className="relative overflow-hidden bg-gray-900/50 rounded-lg">
                          <img
                            className="mx-auto rounded-lg shadow-lg object-contain w-full h-auto 
                              max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]" /* Responsive heights */
                            loading="lazy"
                            {...props}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                },
                h1({ node, ...props }) {
                  return <h1 className="text-green-500 text-2xl font-bold mt-8 mb-4" {...props} />;
                },
                h2({ node, ...props }) {
                  return <h2 className="text-green-500 text-xl font-semibold mt-6 mb-3" {...props} />;
                },
                h3({ node, ...props }) {
                  return <h3 className="text-white text-lg font-medium mt-4 mb-2" {...props} />;
                },
                blockquote({ node, ...props }) {
                  return (
                    <blockquote className="border-l-4 border-green-500 pl-4 italic my-4" {...props} />
                  );
                },
                p({ node, ...props }) {
                  return <div className="text-gray-300 my-4 leading-relaxed" {...props} />;
                },
                pre({ node, ...props }) {
                  return (
                    <pre className="max-w-full overflow-x-auto p-4 bg-gray-800 rounded-lg break-all" {...props} />
                  );
                },
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="max-w-full overflow-x-auto p-4 bg-gray-800 rounded-lg"> {/* Added padding for code block */}
                      <SyntaxHighlighter 
                        style={vscDarkPlus} 
                        language={match[1]} 
                        PreTag="div" 
                        customStyle={{
                          margin: '1.5em 0',
                          borderRadius: '0.375rem',
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-300 overflow-x-auto break-all" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {writeup.content || "No content available"}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
}
