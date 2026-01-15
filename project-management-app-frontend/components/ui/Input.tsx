import { cn } from "@/app/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 " +
          "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300",
        props.className
      )}
    />
  );
}
