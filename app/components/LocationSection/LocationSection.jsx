import LocationMap from "./LocationMap";
import styles from "./LocationSection.module.scss";

export default function LocationSection() {
  return (
    <section className={styles.location}>
      <div className={styles.location__map}>
        <LocationMap />
      </div>

      <div className={styles.location__content}>
        <div>
          <p className={styles.location__eyebrow}>Location</p>

          <h2 className={styles.location__title}>
            Stay around Lekki.
          </h2>

          <p className={styles.location__place}>
            Lekki, Lagos
          </p>
        </div>

        <a
          className={styles.location__link}
          href="https://www.openstreetmap.org/?mlat=6.4351&mlon=3.4559#map=16/6.4351/3.4559"
          target="_blank"
          rel="noreferrer"
        >
          View on map
        </a>
      </div>
    </section>
  );
}