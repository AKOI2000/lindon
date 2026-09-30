import { signInWithGoogle } from "@/app/actions/auth";
import GuestArea from "@/app/components/GuestArea/GuestArea";
import Header from "@/app/components/Header";
import styles from "./Login.module.scss";

export default function AccountLoginPage() {
  return (
    <>
      <Header>
        <GuestArea />
      </Header>
      <main className={styles.login}>
        <div className={styles.login__content}>
          <p className={styles.login__eyebrow}>Guest Area</p>

          <h1 className={styles.login__title}>Sign in to manage your stay.</h1>

          <p className={styles.login__description}>
            Access your reservations, manage your details, and keep track of
            your upcoming stays.
          </p>

          <form className={styles.login__form} action={signInWithGoogle}>
            <button className={styles.login__button} type="submit">
              Continue with Google
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
