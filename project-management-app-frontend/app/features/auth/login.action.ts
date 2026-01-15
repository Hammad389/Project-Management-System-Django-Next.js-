"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import z from "zod";
import { createSession } from "./sessions";

const loginSchema = z.object({
  username: z.string().trim(),
  password: z.string().min(6),
});

export async function login(_: any, formData: FormData) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  // 1️⃣ Login
  const res = await fetch("http://localhost:8000/api/auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    return { error: "Invalid credentials" };
  }

  const tokens = await res.json();

  // 2️⃣ Store tokens securely
  const cookieStore = await cookies();

  cookieStore.set("access_token", tokens.access, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  cookieStore.set("refresh_token", tokens.refresh, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });
  // 3️⃣ Fetch user profile
  const meRes = await fetch("http://localhost:8000/api/users/me/", {
    headers: {
      Authorization: `Bearer ${tokens.access}`,
    },
  });

  const user = await meRes.json();

  // 4️⃣ Create frontend session (identity only)
  await createSession({
    id: user.id,
    username: user.username,
    role: user.role,
  });
  // 5️⃣ Redirect
  if (user.role === "Developer") redirect(`/dev/`);
  if (user.role === "QA") redirect(`/qa/`);
  if (user.role === "ProjectManager") redirect(`/pm/`);

  redirect("/dashboard");
}
