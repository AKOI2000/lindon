import Link from "next/link";
import { auth } from "@/auth";
import GuestAreaMenu from "./GuestAreaMenu";
import styles from "./GuestArea.module.scss";

export default async function GuestArea() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/account" className={styles.guestArea}>
        Guest Area
      </Link>
    );
  }

  return <GuestAreaMenu user={session.user} />;
}