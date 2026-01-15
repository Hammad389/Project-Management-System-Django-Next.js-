"use server";

import z from "zod";

const signUpSchema = z
  .object({
    name: z.string().nonempty(),
    username: z.string().min(5),
    role: z.string().nonempty(),
    email: z.string().email().trim(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export async function signUp(_: any, formData: FormData) {
  const rawData = Object.fromEntries(formData);

  const parsed = signUpSchema.safeParse({
    ...rawData,
    password: String(rawData.password ?? ""),
    confirm_password: String(rawData.confirm_password ?? ""),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      values: rawData,
    };
  }

  const res = await fetch("http://localhost:8000/api/users/register/", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: parsed.data.name,
      username: parsed.data.username,
      email: parsed.data.email,
      password: parsed.data.password,
      role: parsed.data.role,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      success: false,
      error: data?.detail || data?.error || "Signup failed",
      values: rawData,
    };
  }

  return {
    success: true,
  };
}
