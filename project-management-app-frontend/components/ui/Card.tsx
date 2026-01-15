import { cn } from "@/app/lib/utils";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        props.className
      )}
      {...props}
    />
  );
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pb-3", props.className)} {...props} />;
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold text-slate-900", props.className)} {...props} />;
}

export function CardDesc(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-slate-600", props.className)} {...props} />;
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-2", props.className)} {...props} />;
}
