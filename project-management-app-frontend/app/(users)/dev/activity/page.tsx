import { Card, CardContent } from "@/components/ui/Card";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { Badge } from "@/components/ui/Badge";

const activity = [
  { id: "a1", type: "Review", text: "Requested review for PR #128", time: "2h ago", tone: "blue" as const },
  { id: "a2", type: "Update", text: "Moved task to In Review", time: "6h ago", tone: "indigo" as const },
  { id: "a3", type: "Fix", text: "Addressed QA feedback on validation", time: "Yesterday", tone: "green" as const },
];

export default function DevActivity() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <SectionHeader title="Activity" subtitle="Timeline UI. Replace with real events." />
        <div className="grid gap-3">
          {activity.map((a) => (
            <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge tone={a.tone}>{a.type}</Badge>
                    <span className="text-sm font-medium text-slate-900">{a.text}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
