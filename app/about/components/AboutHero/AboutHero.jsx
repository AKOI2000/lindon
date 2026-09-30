import Image from "next/image";
import styles from "./AboutHero.module.scss";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>About Lindon</p>

          <h1>
            Short stays,
            <br />
            thoughtfully managed.
          </h1>

          <p className={styles.description}>
            Lindon manages a collection of short-let apartments across Lekki,
            Lagos, offering comfortable spaces for short stays in Admiralty,
            Freedom Way and Chevron.
          </p>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/about-hero.jpg"
            alt="Lindon apartment"
            width={500}
            height={500}
            priority
            sizes="(max-width: 768px) 100vw, 65vw"
          />
        </div>
      </div>
    </section>
  );
}