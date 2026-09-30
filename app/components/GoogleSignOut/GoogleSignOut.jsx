import { signOutUser } from "@/app/actions/auth";

export default function GoogleSignOut() {
  return (
    <form action={signOutUser}>
      <button type="submit">Logout</button>
    </form>
  );
}
