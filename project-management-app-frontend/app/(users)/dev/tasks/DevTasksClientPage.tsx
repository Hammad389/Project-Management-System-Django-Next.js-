"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/app/lib/utils";

const API_BASE = "http://localhost:8000/api";

/* ===================== TYPES ===================== */

type TaskStatus = "BACKLOG" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  due_date: string | null;
  project: {
    id: number;
    title: string;
  };
};

/* ===================== COMPONENT ===================== */

export default function DevTasks({ accessToken }: { accessToken: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<TaskStatus | "All">("All");
  const [priority, setPriority] = useState<Priority | "All">("All");

  /* ---------------- FETCH TASKS ---------------- */

  async function fetchTasks() {
    if (!accessToken) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/tasks/dev/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load dev tasks", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [accessToken]);

  /* ---------------- FILTER ---------------- */

  const rows = useMemo(() => {
    return tasks
      .filter((t) => (status === "All" ? true : t.status === status))
      .filter((t) => (priority === "All" ? true : t.priority === priority))
      .filter((t) =>
        q.trim() ? t.title.toLowerCase().includes(q.toLowerCase()) : true
      );
  }, [tasks, q, status, priority]);

  /* ---------------- UI ---------------- */

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <SectionHeader
          title="My Tasks"
          subtitle="Tasks assigned to you."
          right={
            <div className="flex flex-wrap gap-2">
              <Input
                className="w-64"
                placeholder="Search tasks..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />

              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="All">All Status</option>
                <option value="BACKLOG">Backlog</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="DONE">Done</option>
              </Select>

              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
              >
                <option value="All">All Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </Select>
            </div>
          }
        />

        {loading && (
          <div className="text-sm text-slate-500">Loading tasks…</div>
        )}

        <div className="grid gap-3">
          {rows.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-600">
                    {t.project.title}
                  </div>

                  <div className="text-base font-semibold text-slate-900 mt-1">
                    {t.title}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge
                      tone={
                        t.status === "DONE"
                          ? "green"
                          : t.status === "IN_PROGRESS"
                          ? "indigo"
                          : t.status === "IN_REVIEW"
                          ? "blue"
                          : "gray"
                      }
                    >
                      {t.status.replace("_", " ")}
                    </Badge>

                    <Badge
                      tone={
                        t.priority === "CRITICAL"
                          ? "red"
                          : t.priority === "HIGH"
                          ? "yellow"
                          : "gray"
                      }
                    >
                      {t.priority}
                    </Badge>
                  </div>
                </div>

                <div className="text-sm text-slate-600 shrink-0">
                  Due:{" "}
                  <span className="font-medium text-slate-900">
                    {t.due_date ? formatDate(t.due_date) : "—"}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Next: update status, link PR, request review.
              </div>
            </div>
          ))}

          {!loading && rows.length === 0 && (
            <div className="text-sm text-slate-600">
              No tasks match your filters.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
