// app/pm/projects/page.tsx  (SERVER COMPONENT)
import PMProjectsClient from "./DevClientPage";
import { cookies } from "next/headers";

export default async function DevClientPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return <div>Unauthorized</div>;
  }

  return <PMProjectsClient accessToken={token} />;
}
