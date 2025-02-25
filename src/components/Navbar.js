'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "~/1" },
    { href: "/1", label: "~/2" },
    { href: "/2", label: "~/3" },
    { href: "/3", label: "~/4" },
    { href: "/4", label: "~/5" }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg' 
        : 'bg-[#0a0a0a]'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="relative group"
          >
            <div className="text-2xl font-mono font-bold transition-shadow duration-300 hover:shadow-lg">
              <span className="text-[#F2DEBA] text-shadow-md hover:text-[#E0B88D]">
                Aditya Kumar
              </span>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-purple-600 group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 focus:outline-none group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                <div className={`bg-green-400 h-[2px] w-7 transform transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-[42deg] translate-y-6' : ''}`}></div>
                <div className={`bg-green-400 h-[2px] w-7 rounded transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`bg-green-400 h-[2px] w-7 transform transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-[42deg] -translate-y-6' : ''}`}></div>
              </div>
            </div>
          </button>

          {/* Navigation Links */}
          <div className={`${
            isMenuOpen 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100'
          } fixed lg:relative top-0 right-0 h-screen lg:h-auto w-2/3 lg:w-auto bg-[#1a1a1a]/95 lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none transition-all duration-300 ease-in-out lg:flex items-center space-x-8 p-8 lg:p-0`}>
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex items-center py-3 lg:py-0"
                onMouseEnter={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-fira-code text-sm tracking-wider text-slate-300 group-hover:text-green-400 transition-colors duration-300">
                  <span className="text-green-400 mr-1">&gt;</span>
                  {link.label}
                </span>
                <span className={`${
                  isHovered === i ? 'opacity-100' : 'opacity-0'
                } ml-1 text-green-400 transition-opacity duration-300`}>_</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
