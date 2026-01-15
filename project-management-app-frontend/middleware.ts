// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/* ===================== CONFIG ===================== */

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET!);

/**
 * Truly public routes (exact or prefix-based)
 */
const PUBLIC_ROUTE_PREFIXES = ["/auth/login", "/auth/signup", "/403"];

/**
 * Role → route prefix mapping
 */
const ROLE_ROUTE_MAP: Record<string, string[]> = {
  Developer: ["/dev"],
  QA: ["/qa"],
  ProjectManager: ["/pm"],
};

/* ===================== MIDDLEWARE ===================== */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* -------------------- 1. Allow public routes -------------------- */
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  /* -------------------- 2. Read session cookie -------------------- */
  const sessionCookie = request.cookies.get("session")?.value;

  if (!sessionCookie) {
    return redirectToLogin(request, true);
  }

  /* -------------------- 3. Verify JWT -------------------- */
  let user: any;

  try {
    const { payload } = await jwtVerify(sessionCookie, encodedKey);
    user = payload?.user;
  } catch {
    return redirectToLogin(request, true);
  }

  if (!user?.role) {
    return redirectToLogin(request, true);
  }

  /* -------------------- 4. Block auth pages ONLY if session is valid -------------------- */
  if (pathname.startsWith("/auth")) {
    return redirectToDashboard(request, user);
  }

  /* -------------------- 5. Role-based authorization -------------------- */
  const allowedPrefixes = ROLE_ROUTE_MAP[user.role] || [];

  const isRoleProtectedRoute = Object.values(ROLE_ROUTE_MAP)
    .flat()
    .some((prefix) => pathname.startsWith(prefix));

  if (
    isRoleProtectedRoute &&
    !allowedPrefixes.some((prefix) => pathname.startsWith(prefix))
  ) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  /* -------------------- 6. Allow request -------------------- */
  return NextResponse.next();
}

/* ===================== HELPERS ===================== */

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

function redirectToLogin(request: NextRequest, clearCookie = false) {
  const response = NextResponse.redirect(new URL("/auth/login", request.url));

  if (clearCookie) {
    response.cookies.delete("session");
  }

  return response;
}

function redirectToDashboard(request: NextRequest, user: any) {
  const map: Record<string, string> = {
    Developer: "/dev",
    QA: "/qa",
    ProjectManager: "/pm",
  };

  return NextResponse.redirect(new URL(map[user.role] ?? "/", request.url));
}

/* ===================== MATCHER ===================== */

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
