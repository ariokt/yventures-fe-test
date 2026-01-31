'use client';

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <header className="h-14 fixed flex items-center px-4 bg-gray-900 shadow w-full">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-xl text-white"
        >
          ☰
        </button>
      </header>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}