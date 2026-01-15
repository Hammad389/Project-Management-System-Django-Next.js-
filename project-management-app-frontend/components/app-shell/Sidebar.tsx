import { NavItem } from "./NavItem";

export type NavGroup = {
  title: string;
  items: Array<{ href: string; label: string }>;
};

export function Sidebar({
  appName,
  roleLabel,
  groups,
}: {
  appName: string;
  roleLabel: string;
  groups: NavGroup[];
}) {
  return (
    <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-600">{appName}</div>
            <div className="text-lg font-semibold text-slate-900">{roleLabel}</div>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-indigo-600 text-white grid place-items-center font-semibold">
            PM
          </div>
        </div>
        <div className="mt-4 text-xs text-slate-500">
          Consistent UI shell for all roles. Replace dummy data with your Django API later.
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="space-y-5">
          {groups.map((g) => (
            <div key={g.title}>
              <div className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {g.title}
              </div>
              <div className="mt-2 grid gap-2">
                {g.items.map((it) => (
                  <NavItem key={it.href} href={it.href} label={it.label} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
