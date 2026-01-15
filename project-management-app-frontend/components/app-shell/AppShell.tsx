import { Sidebar, NavGroup } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({
  role,
  nav,
  children,
  hint,
}: {
  role: "PM" | "DEV" | "QA";
  nav: NavGroup[];
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
          <Sidebar appName="Nova PM" roleLabel={role === "PM" ? "Project Manager" : role === "DEV" ? "Developer" : "QA Engineer"} groups={nav} />
          <main className="space-y-4">
            <Topbar role={role} hint={hint} />
            {children}
            <div className="text-xs text-slate-500 pt-2">
              UI-only frontend. Replace mock data + actions with Django API calls.
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
