import Image from "next/image";
import styles from "./ApartmentGallery.module.scss";

export default function ApartmentGallery({ images }) {
  const galleryImages = images.slice(1);

  if (!galleryImages.length) {
    return null;
  }

  return (
    <section className={styles.gallery}>
      <div className={styles.gallery__header}>
        <p className={styles.gallery__eyebrow}>The space</p>

        <h2 className={styles.gallery__title}>Take a closer look.</h2>
      </div>

      <div className={styles.gallery__grid}>
        {galleryImages.map((image, index) => (
          <div className={styles.gallery__image} key={image}>
            <Image
              src={image}
              alt={`Apartment view ${index + 2}`}
              height={400}
              width={900}
              sizes="(max-width: 608px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
