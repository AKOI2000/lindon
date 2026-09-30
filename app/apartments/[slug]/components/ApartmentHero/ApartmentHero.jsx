import Image from "next/image";
import styles from "./ApartmentHero.module.scss";

export default function ApartmentHero({ apartment }) {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__image}>
        <Image
          src={apartment.images[0]}
          alt={apartment.name}
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className={styles.hero__content}>
        <div className={styles.hero__heading}>
          <p className={styles.hero__eyebrow}>
            {apartment.location}
          </p>

          <h1 className={styles.hero__title}>
            {apartment.name}
          </h1>
        </div>

        <div className={styles.hero__info}>
          <span>{apartment.bedrooms} bedrooms</span>
          <span>{apartment.guestCapacity} guests</span>
          <span>{apartment.pricePerNight} / night</span>
        </div>

        <p className={styles.hero__description}>
          {apartment.description}
        </p>
      </div>
    </section>
  );
}