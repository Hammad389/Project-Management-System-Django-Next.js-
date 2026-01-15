"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ProjectService } from "@/app/features/projects/project.service";
import { Project } from "@/app/features/projects/projects.types";
import { formatDate } from "@/app/lib/utils";

export default function DevProjects({
  accessToken,
}: {
  accessToken: string;
}){
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProjects() {
    setLoading(true);
    setError("");

    try {
      const data = await ProjectService.getForDev(accessToken);

      // 🔒 HARD SAFETY CHECK
      if (!Array.isArray(data)) {
        throw new Error("Invalid projects response");
      }

      setProjects(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <SectionHeader
          title="My Projects"
          subtitle="Projects where you are assigned as a developer."
        />

        {loading && (
          <div className="text-sm text-slate-500">Loading projects…</div>
        )}

        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}

        <div className="grid gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge
                    tone={
                      p.status === "Active"
                        ? "green"
                        : p.status === "On Hold"
                        ? "yellow"
                        : "gray"
                    }
                  >
                    {p.status}
                  </Badge>

                  <div className="text-base font-semibold text-slate-900 mt-1">
                    {p.title}
                  </div>

                  <div className="text-sm text-slate-600 mt-1">
                    {p.project_description}
                  </div>
                </div>

                <div className="text-sm text-slate-600 shrink-0">
                  Due:{" "}
                  <span className="font-medium text-slate-900">
                    {formatDate(p.due_date)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {!loading && projects.length === 0 && (
            <div className="text-sm text-slate-600">
              No assigned projects.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
