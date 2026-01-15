"use server";
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

export type SessionUser = {
  id: number;
  username: string;
  role: string;
};

type SessionPayload = {
  user: SessionUser;
  expiresAt: string;
};

export async function createSession(user: SessionUser) {
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const session = await new SignJWT({
    user,
    expiresAt: expiresAt.toISOString(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encodedKey);

  cookieStore.set("session", session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
