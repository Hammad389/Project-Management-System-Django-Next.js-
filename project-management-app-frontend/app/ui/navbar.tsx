'use client'

import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setMenu] = useState(false)

  return (
    <div className="w-full overflow-x-hidden bg-slate-950 text-white">
      {/* ================= NAVBAR ================= */}
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-500">
            ProjectFlow
          </h1>

          <nav className="hidden md:flex gap-8 text-sm text-slate-300">
            <a className="hover:text-white" href="#features">Features</a>
            <a className="hover:text-white" href="#roles">Roles</a>
            <a className="hover:text-white" href="#pricing">Pricing</a>
          </nav>

          <div className="flex gap-3">
            <a
              href="/login"
              className="px-4 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 text-white"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}
