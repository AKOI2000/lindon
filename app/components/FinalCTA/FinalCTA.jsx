import Link from "next/link";
import styles from "./FinalCTA.module.scss";
import Image from "next/image";

export default function FinalCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.overlay} />
      <Image src={"/home-cta.jpg"} alt="Lindon" fill />

      <div className={styles.cta__content}>
        <h2 className={styles.cta__title}>Find your next stay.</h2>

        <p className={styles.cta__description}>
          Explore the apartments, check availability and book your stay with
          Lindon.
        </p>

        <Link className={styles.cta__link} href="/apartments">
          Explore apartments
        </Link>
      </div>
    </section>
  );
}
