// app/pm/projects/page.tsx  (SERVER COMPONENT)
import DevTasks from "./DevTasksClientPage";
import { cookies } from "next/headers";

export default async function DevProjectClientPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return <div>Unauthorized</div>;
  }

  return <DevTasks accessToken={token} />;
}
