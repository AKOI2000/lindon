"use server";

import { signIn, signOut } from "@/auth";

export async function signInWithGoogle() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signInWithGoogleFromApartment(formData) {
  const redirectTo = formData.get("redirectTo");

  await signIn("google", {
    redirectTo: redirectTo || "/account",
  });
}

export async function signOutUser() {
  await signOut({
    redirectTo: "/",
  });
}