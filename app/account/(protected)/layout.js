import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "../../components/Header";
import GuestArea from "../../components/GuestArea/GuestArea";
import AccountSidebar from "../components/AccountSidebar/AccountSidebar";
import styles from "../Account.module.scss";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AccountLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/account/login");
  }

  return (
    <>
      <Header>
        <GuestArea />
      </Header>

      <main className={styles.account}>
        <div className={styles.account__layout}>
          <AccountSidebar />

          <div className={styles.account__content}>{children}</div>
        </div>
      </main>
    </>
  );
}
