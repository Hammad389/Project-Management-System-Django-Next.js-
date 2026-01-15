import { AppShell } from "@/components/app-shell/AppShell";

const nav = [
  {
    title: "Workspace",
    items: [
      { href: "/dev", label: "Overview" },
      { href: "/dev/tasks", label: "My Tasks" },
      { href: "/dev/my-projects", label: "My Projects" },
    ],
  },
  {
    title: "Quality",
    items: [
      { href: "/dev/activity", label: "Activity" },
      { href: "/dev/settings", label: "Settings" },
    ],
  },
];

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return <AppShell role="DEV" nav={nav} hint="Build, review, ship with confidence." children={children} />;
}
