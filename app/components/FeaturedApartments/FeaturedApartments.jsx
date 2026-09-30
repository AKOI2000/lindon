import Link from "next/link";
import Image from "next/image";
import styles from "./FeaturedApartments.module.scss";

export default function FeaturedApartments({ apartments }) {
  return (
    <section className={styles.featuredApartments}>
      <div className={styles.featuredApartments__header}>
        <p className={styles.featuredApartments__eyebrow}>Stay with Lindon</p>

        <h2 className={styles.featuredApartments__title}>
          Find a place that feels like yours.
        </h2>

        <p className={styles.featuredApartments__description}>
          Explore our collection of thoughtfully selected apartments, designed
          for comfortable stays.
        </p>
      </div>

      <div className={styles.featuredApartments__grid}>
        {apartments.map((apartment) => (
          <article
            className={styles.featuredApartments__card}
            key={apartment.id}
          >
            <div className={styles.featuredApartments__image}>
              {/* Apartment image goes here */}
              <Image
                src={apartment.images[0]}
                alt={apartment.name}
                width={400}
                height={300}
              />
            </div>

            <h3 className={styles.featuredApartments__name}>
              {apartment.name}
            </h3>

            <p className={styles.featuredApartments__location}>
              {apartment.location}
            </p>

            <div className={styles.featuredApartments__details}>
              <span>{apartment.bedrooms} bedrooms</span>
              <span>{apartment.guestCapacity} guests</span>
            </div>

            <div className={styles.featuredApartments__footer}>
              <p className={styles.featuredApartments__price}>
                {apartment.pricePerNight} / night
              </p>

              <Link
                className={styles.featuredApartments__link}
                href={`/apartments/${apartment.slug}`}
              >
                View apartment
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
