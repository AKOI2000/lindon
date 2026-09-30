import Image from "next/image";
import Link from "next/link";
import styles from "./ApartmentGrid.module.scss";

export default function ApartmentGrid({ apartments }) {
  return (
    <section className={styles.grid}>
      {apartments.map((apartment) => (
        <article className={styles.grid__card} key={apartment.id}>
          <Link
            className={styles.grid__image}
            href={`/apartments/${apartment.slug}`}
          >
            <Image
              src={apartment.images[0]}
              alt={apartment.name}
              height={400}
              width={900}
              sizes="(max-width: 608px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>

          <div className={styles.grid__content}>
            <div>
              <h2 className={styles.grid__name}>
                {apartment.name}
              </h2>

              <p className={styles.grid__location}>
                {apartment.location}
              </p>
            </div>

            <div className={styles.grid__details}>
              <span>{apartment.bedrooms} bedrooms</span>
              <span>{apartment.guestCapacity} guests</span>
            </div>

            <div className={styles.grid__footer}>
              <p className={styles.grid__price}>
                {apartment.pricePerNight} / night
              </p>

              <Link
                className={styles.grid__link}
                href={`/apartments/${apartment.slug}`}
              >
                View apartment
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}