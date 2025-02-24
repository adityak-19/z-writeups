"use client";

import Link from "next/link";
import { getWriteups } from "../../lib/writeups";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Writeups() {
  const [writeups, setWriteups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWriteups() {
      try {
        const data = await getWriteups();
        setWriteups(data);
      } catch (error) {
        console.error("Error fetching writeups:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWriteups();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-foreground font-mono flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-green-500 text-xl">Loading writeups...</p>
        </div>
      </main>
    );
  }

  // Group events by year
  const eventsByYear = Object.keys(writeups).reduce((acc, event) => {
    const year = event.match(/\d{4}/)?.[0] || 'Other';
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(eventsByYear).sort((a, b) => b - a);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-foreground font-mono">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-16"
        >
          <span className="text-white">&lt;</span>
          <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            CTF Writeups
          </span>
          <span className="text-white">/&gt;</span>
        </motion.h1>

        <div className="relative pl-4 sm:pl-6">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-green-500/50" />

          {sortedYears.map((year, yearIndex) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: yearIndex * 0.1 }}
              className="mb-10 sm:mb-12"
            >
              {/* Year marker */}
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full -ml-[7px]" />
                <span className="ml-4 text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                  {year}
                </span>
              </div>

              {/* Events for the year */}
              <div className="space-y-4 sm:space-y-6 ml-6 sm:ml-8">
                {eventsByYear[year].map((event, eventIndex) => {
                  const writeupInfo = writeups[event];
                  const name = event;
                  
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (yearIndex * 0.1) + (eventIndex * 0.05) }}
                    >
                      <Link
                        href={`/writeups/${name}`}
                        className="group block bg-black/40 rounded-lg p-4 sm:p-6 hover:bg-black/60 transition-all duration-300 border border-white/5 hover:border-green-500/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm sm:text-base text-gray-300 group-hover:text-green-400 transition-colors">
                            {name}
                          </div>
                          <div className="text-green-500 transform group-hover:translate-x-1 transition-transform">
                            →
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
