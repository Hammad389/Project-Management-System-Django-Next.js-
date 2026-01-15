import { cn } from "@/app/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const { className, variant = "primary", ...rest } = props;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 border border-slate-200",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
  };

  return <button className={cn(base, variants[variant], className)} {...rest} />;
}
