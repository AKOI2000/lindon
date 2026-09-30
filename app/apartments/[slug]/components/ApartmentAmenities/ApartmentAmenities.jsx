import styles from "./ApartmentAmenities.module.scss";

export default function ApartmentAmenities({ amenities }) {
  if (!amenities?.length) {
    return null;
  }

  return (
    <section className={styles.amenities}>
      <div className={styles.amenities__header}>
        <p className={styles.amenities__eyebrow}>Amenities</p>

        <h2 className={styles.amenities__title}>
          Everything you need for a comfortable stay.
        </h2>
      </div>

      <div className={styles.amenities__list}>
        {amenities.map((amenity) => (
          <div className={styles.amenities__item} key={amenity}>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </section>
  );
}