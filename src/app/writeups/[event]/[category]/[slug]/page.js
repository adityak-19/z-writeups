"use client";

import { useEffect, useState, use } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
import { getWriteups } from "../../../../../lib/writeups";
import { motion } from "framer-motion";

const DEFAULT_OWNER = 'adityak-19';
const DEFAULT_REPO = 'z-writeups';

export default function Writeup({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const event = decodeURIComponent(params.event);
  const category = decodeURIComponent(params.category);
  const slug = decodeURIComponent(params.slug);

  const [writeup, setWriteup] = useState(null);
  const [writeups, setWritups] = useState({});
  const [loading, setLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const getImageUrl = (relativePath) => {
    if (!relativePath) return '';
    
    // Handle relative paths (../assets)
    if (relativePath.startsWith('../')) {
      const pathParts = relativePath.split('/');
      const filename = pathParts[pathParts.length - 1];
      return `https://raw.githubusercontent.com/${DEFAULT_OWNER}/${DEFAULT_REPO}/main/public/writeups/${event}/assets/${filename}`;
    }
    
    // Handle absolute paths
    const cleanPath = relativePath
      .replace(/^\//, '')
      .replace(/^public\//, '')
      .replace(/^writeups\//, '')
      .replace(/^images\//, '');
    
    const fullUrl = `https://raw.githubusercontent.com/${DEFAULT_OWNER}/${DEFAULT_REPO}/main/public/writeups/${event}/assets/${cleanPath}`;
    
    return fullUrl;
  };

  useEffect(() => {
    let mounted = true;
    let timeoutId;

    async function fetchWriteup() {
      try {
        timeoutId = setTimeout(() => {
          if (mounted && loading) {
            console.log("Loading taking longer than expected...");
            // Only set timeout if we haven't loaded any data yet
            if (!writeup) {
              setLoadingTimeout(true);
            }
          }
        }, 20000); // Increased to 20 seconds

        const fetchedWriteups = await getWriteups();
        if (!mounted) return;
        
        setWritups(fetchedWriteups);
        
        if (!fetchedWriteups[event]?.categories) {
          console.error("No categories found for event:", event);
          return;
        }

        const categoryData = fetchedWriteups[event].categories[category];
        if (!categoryData) {
          console.error("Category not found:", category);
          return;
        }

        const foundWriteup = categoryData.find(w => w.slug === slug);
        if (!foundWriteup) {
          console.error("Writeup not found:", slug);
          return;
        }

        setWriteup(foundWriteup);
        setLoadingTimeout(false); // Reset timeout if we successfully load
      } catch (error) {
        console.error("Error fetching writeup:", error);
        setLoadingTimeout(true); // Show timeout message on error
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchWriteup();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [event, category, slug]);

  useEffect(() => {
    if (writeup && !contentLoaded) {
      // Delay markdown processing slightly to improve perceived performance
      requestAnimationFrame(() => {
        setContentLoaded(true);
      });
    }
  }, [writeup]);

  if (loadingTimeout) {
    return (
      <main className="min-h-screen bg-black text-foreground font-mono p-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href={`/writeups/${event}`}
            className="text-green-500 hover:text-green-400 mb-8 inline-block"
          >
            ← Back to Event
          </Link>
          <div className="text-red-500">
            <p>Loading took too long. Please try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 border border-red-500 hover:bg-red-500/10"
            >
              Reload Page
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-foreground font-mono p-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href={`/writeups/${event}`}
            className="text-green-500 hover:text-green-400 mb-8 inline-block"
          >
            ← Back to Event
          </Link>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-green-500">Loading writeup...</p>
          </div>
        </div>
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

      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <Link 
          href={`/writeups/${event}`}
          className="text-green-500 hover:text-green-400 mb-8 inline-block"
        >
          ← Back to Event
        </Link>
        
        {writeup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">{writeup.title}</h1>
            {contentLoaded ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img({ node, ...props }) {
                    const imgSrc = getImageUrl(props.src);
                    
                    return (
                      <div className="w-full px-4 sm:px-6 lg:px-8 my-8">
                        <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
                          <div className="relative overflow-hidden bg-gray-900/50 rounded-lg">
                            <img
                              {...props}
                              src={imgSrc}
                              alt={props.alt || 'Image'}
                              className="mx-auto rounded-lg shadow-lg object-contain w-full h-auto 
                                max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]"
                              loading="lazy"
                              onError={(e) => {
                                console.error('Image failed to load:', {
                                  original: props.src,
                                  processed: imgSrc,
                                  event: params.event
                                });
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
            ) : (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
