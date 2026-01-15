import { cn } from "@/app/lib/utils";
import { Button } from "./Buttons";

export function Modal({
  open,
  title,
  description,
  children,
  onClose,
  footer,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={cn("relative w-[92vw] max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-xl")}>
        <div className="p-5 border-b border-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              {description ? <p className="text-sm text-slate-600 mt-1">{description}</p> : null}
            </div>
            <Button variant="ghost" onClick={onClose} aria-label="Close">
              ✕
            </Button>
          </div>
        </div>

        <div className="p-5">{children}</div>

        <div className="p-5 border-t border-slate-200 flex items-center justify-end gap-2">
          {footer ?? (
            <>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button onClick={onClose}>Done</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
