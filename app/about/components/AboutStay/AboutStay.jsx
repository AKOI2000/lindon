import Image from "next/image";
import styles from "./AboutStay.module.scss";

const images = [
  {
    src: "/stay-1.jpg",
    alt: "Lindon apartment interior",
    className: "large",
  },
  {
    src: "/stay-2.jpg",
    alt: "Lindon apartment living space",
    className: "small",
  },
  {
    src: "/stay-3.jpg",
    alt: "Lindon apartment detail",
    className: "small",
  },
];

export default function AboutStay() {
  return (
    <section className={styles.stay}>
      <div className={styles.intro}>
        <div className={styles.label}>
          <span>03</span>
          <span>The stay</span>
        </div>

        <h2>
          A comfortable
          <br />
          place to settle in.
        </h2>
      </div>

      <div className={styles.grid}>
        {images.map((image) => (
          <div
            className={`${styles.imageWrapper} ${styles[image.className]}`}
            key={image.src}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <a href="/apartments" className={styles.link}>
          Explore apartments
          <span>↗</span>
        </a>
      </div>
    </section>
  );
}