import { apiFetch } from "@/app/lib/api";

export const UserService = {
  async getDevelopers(token: string) {
    return apiFetch("/users/developers/", { method: "GET" }, token);
  },

  async getQAs(token: string) {
    return apiFetch("/users/qas/", { method: "GET" }, token);
  },
};
