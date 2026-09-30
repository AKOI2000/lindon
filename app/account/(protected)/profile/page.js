import Image from "next/image";
import { auth } from "@/auth";
import ProfileForm from "./ProfileForm";
import styles from "./Profile.module.scss";

export default async function ProfilePage() {
  const session = await auth();
  const user = session.user;

  return (
    <div className={styles.profile}>
      <header className={styles.profile__header}>
        <p className={styles.profile__eyebrow}>Profile</p>

        <h1 className={styles.profile__title}>
          Your details.
        </h1>

        <p className={styles.profile__description}>
          Your name, email and profile image come from your Google
          account. Your phone number is stored with Lindon.
        </p>
      </header>

      <section className={styles.profile__section}>
        <div className={styles.profile__identity}>
          <div className={styles.profile__image}>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile"}
                fill
                sizes="8rem"
              />
            ) : (
              <span>
                {(user.name || user.email || "G")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <h2>{user.name || "Guest"}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <ProfileForm phone={user.phone || ""} />
      </section>
    </div>
  );
}