import Image from "next/image";
import styles from "./LindonExperience.module.scss";

export default function LindonExperience() {
  return (
    <section className={styles.experience}>
      <div className={styles.experience__image}>
        <Image src={"/lindon-exp.jpg"} alt="Lindon Experience" width={500} height={500} />
      </div>

      <div className={styles.experience__content}>
        <p className={styles.experience__eyebrow}>
          The Lindon Experience
        </p>

        <h2 className={styles.experience__title}>
          A stay made simple.
        </h2>

        <p className={styles.experience__description}>
          From choosing your apartment to checking out, Lindon keeps
          the experience comfortable, clear and easy.
        </p>

        <div className={styles.experience__features}>
          <div className={styles.experience__feature}>
            <span className={styles.experience__number}>01</span>

            <div>
              <h3>Comfortable spaces</h3>
              <p>
                Thoughtfully arranged apartments designed for a
                comfortable stay.
              </p>
            </div>
          </div>

          <div className={styles.experience__feature}>
            <span className={styles.experience__number}>02</span>

            <div>
              <h3>Simple booking</h3>
              <p>
                Find your apartment, check availability and book
                without unnecessary steps.
              </p>
            </div>
          </div>

          <div className={styles.experience__feature}>
            <span className={styles.experience__number}>03</span>

            <div>
              <h3>Stays that feel personal</h3>
              <p>
                A considered space that gives you room to settle in
                and feel at home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}