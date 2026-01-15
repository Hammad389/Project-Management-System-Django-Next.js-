import { cn } from "@/app/lib/utils";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 " +
          "focus:outline-none focus:ring-2 focus:ring-indigo-300",
        props.className
      )}
    />
  );
}
