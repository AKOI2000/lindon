import styles from "./AboutCTA.module.scss";

export default function AboutCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.content}>
        <div className={styles.label}>
          <span>04</span>
          <span>Your stay</span>
        </div>

        <h2>
          Find your place
          <br />
          in Lekki.
        </h2>

        <a href="/apartments" className={styles.link}>
          Explore apartments
          <span>↗</span>
        </a>
      </div>
    </section>
  );
}