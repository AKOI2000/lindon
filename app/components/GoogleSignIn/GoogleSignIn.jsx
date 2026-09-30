import { signInWithGoogle } from "@/app/actions/auth";

export default function GoogleSignIn() {
  return (
    <form action={signInWithGoogle}>
      <button type="submit">
        Continue with Google
      </button>
    </form>
  );
}