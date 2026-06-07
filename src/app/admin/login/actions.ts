"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

/**
 * Server action for the admin login form. On success Auth.js throws a redirect
 * (to /admin) which must be allowed to propagate — so we only catch AuthError
 * and re-throw everything else.
 */
export async function login(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid email or password. Please try again.";
    }
    throw error;
  }
}
