"use client";

import { useEffect, useMemo, useState } from "react";
import { StatCard } from "../../../components/dashboard/StateCard";
import { SectionHeader } from "../../../components/dashboard/SectionHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";

import { ProjectService } from "@/app/features/projects/project.service";
import { Project } from "@/app/features/projects/projects.types";
import { formatDate } from "../../lib/utils";

export default function DevOverview({
  accessToken,
}: {
  accessToken: string;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH PROJECTS ---------------- */

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await ProjectService.getForDev(accessToken);
      setProjects(res);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [accessToken]);

  /* ---------------- STATS ---------------- */

  const activeProjects = useMemo(
    () => projects.filter((p) => p.status === "Active"),
    [projects]
  );

  const onHoldProjects = useMemo(
    () => projects.filter((p) => p.status === "On Hold"),
    [projects]
  );

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="My Projects"
          value={loading ? "…" : `${projects.length}`}
          hint="Assigned to you"
        />
        <StatCard
          label="Active"
          value={`${activeProjects.length}`}
          hint="Currently working"
        />
        <StatCard
          label="On Hold"
          value={`${onHoldProjects.length}`}
          hint="Blocked / paused"
        />
      </div>

      <Card>
        <CardContent className="space-y-3 p-4">
          <SectionHeader
            title="Assigned Projects"
            subtitle="Projects where you are part of the delivery team."
          />

          {loading && (
            <div className="text-sm text-slate-500">
              Loading projects…
            </div>
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

                    <div className="text-base font-semibold text-slate-900 mt-2">
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
                No projects assigned yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
