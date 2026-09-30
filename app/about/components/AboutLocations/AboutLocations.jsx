import styles from "./AboutLocations.module.scss";

const locations = [
  {
    number: "01",
    name: "Admiralty",
    location: "Lekki, Lagos",
  },
  {
    number: "02",
    name: "Freedom Way",
    location: "Lekki, Lagos",
  },
  {
    number: "03",
    name: "Chevron",
    location: "Lekki, Lagos",
  },
];

export default function AboutLocations() {
  return (
    <section className={styles.locations}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span>02</span>
            <span>Our locations</span>
          </div>

          <h2>
            Stay in
            <br />
            Lekki.
          </h2>

          <p>
            Three locations across Lekki, each offering a convenient base for
            your stay in Lagos.
          </p>
        </div>

        <div className={styles.list}>
          {locations.map((location) => (
            <div className={styles.location} key={location.name}>
              <span className={styles.number}>{location.number}</span>

              <div className={styles.details}>
                <h3>{location.name}</h3>
                <p>{location.location}</p>
              </div>

              <span className={styles.arrow}>↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}