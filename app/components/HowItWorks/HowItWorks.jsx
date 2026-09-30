import styles from "./HowItWorks.module.scss";

const steps = [
  {
    number: "01",
    title: "Explore",
    description:
      "Browse the apartments and find a space that suits your stay.",
  },
  {
    number: "02",
    title: "Check availability",
    description:
      "Choose your dates and see what's available.",
  },
  {
    number: "03",
    title: "Book your stay",
    description:
      "Sign in with Google and complete your booking.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.howItWorks__header}>
        <p className={styles.howItWorks__eyebrow}>How it works</p>

        <h2 className={styles.howItWorks__title}>
          Your stay, without the fuss.
        </h2>
      </div>

      <div className={styles.howItWorks__steps}>
        {steps.map((step) => (
          <article className={styles.howItWorks__step} key={step.number}>
            <span className={styles.howItWorks__number}>
              {step.number}
            </span>

            <div>
              <h3 className={styles.howItWorks__stepTitle}>
                {step.title}
              </h3>

              <p className={styles.howItWorks__description}>
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}