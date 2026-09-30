import styles from "./AboutStory.module.scss";

export default function AboutStory() {
  return (
    <section className={styles.story}>
      <div className={styles.content}>
        <div className={styles.label}>
          <span>01</span>
          <span>About Lindon</span>
        </div>

        <div className={styles.body}>
          <h2>
            Three apartments.
            <br />
            One simple way to stay.
          </h2>

          <p>
            Lindon manages short-let apartments across Lekki, Lagos. Our
            apartments are located in Admiralty, Freedom Way and Chevron,
            giving guests different places to stay while keeping the Lindon
            experience simple.
          </p>
        </div>
      </div>
    </section>
  );
}