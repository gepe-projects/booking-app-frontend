// components/BoxWithCompiler.tsx
"use client"; // Ini penting untuk mengaktifkan React Compiler di Next.js

import React, { useState, useRef, useEffect } from 'react';


const BoxWithCompiler = React.memo(() => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  const borderRef = useRef<HTMLDivElement>(null);

  renderCount.current += 1;

  // Efek ini akan menambahkan dan menghapus kelas border untuk visualisasi render
  useEffect(() => {
    if (borderRef.current) {
      borderRef.current.classList.add('border-red-500', 'border-4');
      const timer = setTimeout(() => {
        borderRef.current?.classList.remove('border-red-500', 'border-4');
      }, 300); // Highlight selama 300ms
      return () => clearTimeout(timer);
    }
  }); // Tidak ada dependency array berarti akan berjalan di setiap render

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div ref={borderRef} className="p-4 m-4 border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-bold mb-2">Dengan React Compiler</h2>
      <p className="text-lg">Counter: {count}</p>
      <p className="text-lg">Total Rerenders: {renderCount.current}</p>
      <button
        onClick={increment}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Increment
      </button>
    </div>
  );
});

export default BoxWithCompiler;