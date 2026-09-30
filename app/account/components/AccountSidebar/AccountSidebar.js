import Link from "next/link";
import { auth } from "@/auth";
import { signOutUser } from "@/app/actions/auth";
import styles from "./AccountSidebar.module.scss";

export default async function AccountSidebar() {
  const session = await auth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <p className={styles.sidebar__eyebrow}>Guest Area</p>

        <h2 className={styles.sidebar__name}>
          {session?.user?.name || "Guest"}
        </h2>
      </div>

      <nav className={styles.sidebar__nav}>
        <Link href="/account">
          Account
        </Link>

        <Link href="/account/reservations">
          Reservations
        </Link>

        <Link href="/account/profile">
          Profile
        </Link>
      </nav>

      <div className={styles.sidebar__footer}>
        <form action={signOutUser}>
          <button type="submit">
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}