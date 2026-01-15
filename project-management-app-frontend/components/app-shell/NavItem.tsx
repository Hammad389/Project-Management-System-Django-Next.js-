"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./../../app/lib/utils";

export function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition border",
        active
          ? "bg-indigo-50 text-indigo-700 border-indigo-100"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
      )}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-50" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
