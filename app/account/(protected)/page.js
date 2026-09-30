import Link from "next/link";
import { auth } from "@/auth";
import { getBookingsForUser } from "@/lib/queries/bookings";
import styles from "./AccountPage.module.scss";
import Image from "next/image";

export default async function AccountPage() {
  const session = await auth();

  const bookings = await getBookingsForUser(session.user.id);

  const upcomingBooking = bookings.find(
    (booking) => new Date(booking.checkOut) > new Date()
  );

  return (
    <div className={styles.account}>
      <header className={styles.account__header}>
        <p className={styles.account__eyebrow}>Account</p>

        <h1 className={styles.account__title}>
          Welcome back{session.user.name ? `, ${session.user.name}` : ""}.
        </h1>

        <p className={styles.account__description}>
          Manage your reservations and stay details.
        </p>
      </header>

      <section className={styles.account__section}>
        <div className={styles.account__sectionHeader}>
          <div>
            <p className={styles.account__eyebrow}>Your stay</p>

            <h2 className={styles.account__heading}>
              {upcomingBooking
                ? "Your next reservation."
                : "No upcoming reservations."}
            </h2>
          </div>

          {upcomingBooking && (
            <Link
              href={`/account/reservations/${upcomingBooking.id}`}
              className={styles.account__link}
            >
              View reservation
            </Link>
          )}
        </div>

        {upcomingBooking ? (
          <article className={styles.account__reservation}>
            <div className={styles.account__image}>
              <Image
                src={upcomingBooking.apartment.images[0]}
                alt={upcomingBooking.apartment.name}
                width={900}
                height={900}
              />
            </div>

            <div className={styles.account__details}>
              <p className={styles.account__location}>
                {upcomingBooking.apartment.location}
              </p>

              <h3>{upcomingBooking.apartment.name}</h3>

              <div className={styles.account__meta}>
                <span>
                  {new Date(upcomingBooking.checkIn).toLocaleDateString()}
                </span>

                <span>→</span>

                <span>
                  {new Date(upcomingBooking.checkOut).toLocaleDateString()}
                </span>
              </div>

              <p className={styles.account__guests}>
                {upcomingBooking.guests}{" "}
                {upcomingBooking.guests === 1 ? "guest" : "guests"}
              </p>
            </div>
          </article>
        ) : (
          <div className={styles.account__empty}>
            <p>
              You don't have an upcoming stay. Explore our apartments
              and find somewhere for your next visit.
            </p>

            <Link
              href="/apartments"
              className={styles.account__button}
            >
              Explore apartments
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}