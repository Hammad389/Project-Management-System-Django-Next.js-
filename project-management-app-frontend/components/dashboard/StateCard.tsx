import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold text-slate-900">{value}</div>
        {hint ? <div className="text-sm text-slate-600 mt-1">{hint}</div> : null}
      </CardContent>
    </Card>
  );
}
