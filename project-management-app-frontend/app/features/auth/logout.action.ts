"use server";

import { cookies } from "next/headers";
import { deleteSession } from "./sessions";
import { redirect } from "next/navigation";

export default async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  await deleteSession();
  redirect("/login");
}
