// app/page.tsx atau pages/index.tsx
"use client";

import { useState } from 'react';
import BoxWithCompilerOptimized from './BoxWithCompilerOptimized';
import BoxWithoutCompiler from './BoxWithoutCompiler';
import BoxWithCompiler from './BoxWithCompiler';

export default function HomePage() {
  const [parentState, setParentState] = useState(0);

  const triggerParentRerender = () => {
    setParentState(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Perbandingan React Compiler (Otomatis)</h1>

      <div className="mb-8">
        <p className="text-lg">State Parent (untuk memicu render ulang): {parentState}</p>
        <button
          onClick={triggerParentRerender}
          className="mt-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Render Ulang Parent
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        <BoxWithCompilerOptimized /> {/* Gunakan komponen yang baru */}
        <BoxWithoutCompiler />
        <BoxWithCompiler />
      </div>
    </div>
  );
}