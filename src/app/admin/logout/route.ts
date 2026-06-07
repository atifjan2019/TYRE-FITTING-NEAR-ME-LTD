// Sign-out endpoint: GET /admin/logout clears the session and returns to login.
import { signOut } from "@/auth";

export async function GET() {
  await signOut({ redirectTo: "/admin/login" });
}
