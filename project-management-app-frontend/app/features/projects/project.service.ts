import { apiFetch } from "@/app/lib/api";
import { CreateProjectPayload } from "./projects.types";

export const ProjectService = {
  // PM
  async getForPM(token: string) {
    return apiFetch("/projects/pm/", { method: "GET" }, token);
  },

  // DEV
  async getForDev(token: string) {
    return apiFetch("/projects/dev/", { method: "GET" }, token);
  },

  // QA
  async getForQA(token: string) {
    return apiFetch("/projects/qa/", { method: "GET" }, token);
  },

  // CREATE (PM)
  async create(payload: CreateProjectPayload, token: string) {
    return apiFetch(
      "/projects/",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token
    );
  },

  // ASSIGN (PM)
  async assign(
    projectId: number,
    payload: { developers: number[]; qas: number[] },
    token: string
  ) {
    return apiFetch(
      `/projects/${projectId}/assign/`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      token
    );
  },
};
