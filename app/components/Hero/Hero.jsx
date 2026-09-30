import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.scss";
import BookingSearch from "./bookingSearch/BookingSearch";

export default function Hero({ apartments }) {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.desktopImage}
          src="https://cdn.prod.website-files.com/6811ad3e11282304843a1ca2/6811ad3e11282304843a1e44_home-hero.webp"
          alt="A Lindon apartment in Lekki, Lagos"
          width={1600}
          height={1270}
          sizes="100vw"
          priority
        />
        <Image
          className={styles.mobileImage}
          src="https://cdn.prod.website-files.com/6811ad3e11282304843a1ca2/6811ad3e11282304843a1e45_stayli-mobile.webp"
          alt="A Lindon apartment in Lekki, Lagos"
          width={1600}
          height={768}
          sizes="100vw"
          priority
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.heading}>
          Furnished apartments in Lekki, ready when you land.
        </h1>
        <p className={styles.subcopy}>
          Three apartments in Lekki Phase 1, fully furnished and cleaned between
          stays. Book for a few nights or a few months.
        </p>
        {/* <div className={styles.actions}>
          <Link href="/apartments" className={styles.primaryCta}>Check availability</Link>
          <Link href="/apartments" className={styles.secondaryCta}>See the apartments</Link>
        </div> */}
        <BookingSearch apartments={apartments} />
      </div>

      <div className={styles.bottomFade} />
      <div id="hero-sentinel" className={styles.sentinel} />
    </section>
  );
}
