import React from 'react';
import Navbar from "../components/Navbar";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 items-center justify-center pt-[52px]">
        <div className="text-center w-full">
          <h1 className="text-5xl font-bold mb-4 text-[#85D1DB]">
            Welcome to Textify!
          </h1>
          <p className="text-xl text-[#85D1DB] mb-6">
            Convert Speech to Text! Using the power of AI
          </p>
        </div>
      </div>
      <div className="flex flex-2"></div>
    </div>
  );
}