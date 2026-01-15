import { Card, CardContent } from "@/components/ui/Card";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Buttons";

export default function DevSettings() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <SectionHeader title="Settings" subtitle="Developer preferences (UI only)." />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Default Task View</div>
            <Select defaultValue="list">
              <option value="list">List</option>
              <option value="board">Board</option>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Daily Summary Email</div>
            <Input placeholder="e.g., 7:00 PM" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Save (UI only)</Button>
        </div>
      </CardContent>
    </Card>
  );
}
