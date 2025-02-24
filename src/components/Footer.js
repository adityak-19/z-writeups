'use client'

export default function Footer() {
  return (
    <footer className="bottom-0 w-full bg-black border-t border-green-500 p-4 backdrop-blur-sm bg-opacity-90">
      <p className="text-gray-300 flex justify-center font-mono">
        &copy; {new Date().getFullYear()} <span className="text-green-500 ml-4">Aditya Kumar</span>. All rights reserved.
      </p>
    </footer>
  );
}