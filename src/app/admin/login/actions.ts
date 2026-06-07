"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

/**
 * Server action for the admin passcode login. On success Auth.js throws a
 * redirect (to /admin) which must propagate - so we only catch AuthError and
 * re-throw everything else.
 */
export async function login(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      passcode: formData.get("passcode"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Incorrect passcode. Please try again.";
    }
    throw error;
  }
}
