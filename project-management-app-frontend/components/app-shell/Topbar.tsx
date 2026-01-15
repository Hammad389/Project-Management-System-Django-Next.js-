"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/app/lib/utils";
import logout from "@/app/features/auth/logout.action";

export function Topbar({
  role,
  hint,
}: {
  role: "PM" | "DEV" | "QA";
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    startTransition(() => {
      logout(); // ✅ server action call
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div className="flex items-center gap-2">
          <Badge tone="indigo">{role} Workspace</Badge>
          {hint ? <span className="text-sm text-slate-600">{hint}</span> : null}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div className="w-full sm:w-80">
            <Input placeholder="Search projects, tasks, bugs..." />
          </div>

          {/* Notifications */}
          <button className="h-9 w-9 rounded-xl border border-slate-200 bg-slate-50 grid place-items-center text-slate-700 hover:bg-slate-100 transition">
            🔔
          </button>

          {/* Profile / Logout */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition",
                open
                  ? "bg-indigo-50 border-indigo-100 text-indigo-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              )}
            >
              <span className="h-6 w-6 rounded-full bg-indigo-600 text-white grid place-items-center text-xs font-bold">
                {role[0]}
              </span>
              <span className="hidden sm:block">{role}</span>
              <span className="text-xs opacity-60">▾</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 text-xs text-slate-500 border-b">
                  Signed in as <br />
                  <span className="font-medium text-slate-900">{role}</span>
                </div>

                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition disabled:opacity-60"
                >
                  {isPending ? "Logging out…" : "Log out"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
