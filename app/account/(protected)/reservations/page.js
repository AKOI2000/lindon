import Link from "next/link";
import { auth } from "@/auth";
import { getBookingsForUser } from "@/lib/queries/bookings";
import styles from "./Reservations.module.scss";
import Image from "next/image";

export default async function ReservationsPage() {
  const session = await auth();

  const bookings = await getBookingsForUser(session.user.id);

  const now = new Date();

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.checkOut) > now,
  );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.checkOut) <= now,
  );

  return (
    <div className={styles.reservations}>
      <header className={styles.reservations__header}>
        <p className={styles.reservations__eyebrow}>Reservations</p>

        <h1 className={styles.reservations__title}>
          Your stays.
        </h1>

        <p className={styles.reservations__description}>
          View and manage your Lindon reservations.
        </p>
      </header>

      <section className={styles.reservations__section}>
        <div className={styles.reservations__sectionHeader}>
          <h2>Upcoming</h2>
        </div>

        {upcomingBookings.length > 0 ? (
          <div className={styles.reservations__list}>
            {upcomingBookings.map((booking) => (
              <ReservationCard
                key={booking.id}
                booking={booking}
              />
            ))}
          </div>
        ) : (
          <div className={styles.reservations__empty}>
            <p>You don't have any upcoming reservations.</p>

            <Link
              href="/apartments"
              className={styles.reservations__button}
            >
              Explore apartments
            </Link>
          </div>
        )}
      </section>

      {pastBookings.length > 0 && (
        <section className={styles.reservations__section}>
          <div className={styles.reservations__sectionHeader}>
            <h2>Past</h2>
          </div>

          <div className={styles.reservations__list}>
            {pastBookings.map((booking) => (
              <ReservationCard
                key={booking.id}
                booking={booking}
                past
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ReservationCard({ booking, past = false }) {
  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);

  return (
    <article
      className={`${styles.reservations__card} ${
        past ? styles.reservations__cardPast : ""
      }`}
    >
      <div className={styles.reservations__image}>
        <Image
          src={booking.apartment.images[0]}
          alt={booking.apartment.name}
          height={900}
          width={900}
        />
      </div>

      <div className={styles.reservations__content}>
        <div>
          <p className={styles.reservations__location}>
            {booking.apartment.location}
          </p>

          <h3>{booking.apartment.name}</h3>
        </div>

        <div className={styles.reservations__details}>
          <div>
            <span>Check-in</span>
            <strong>
              {checkIn.toLocaleDateString("en-GB")}
            </strong>
          </div>

          <div>
            <span>Check-out</span>
            <strong>
              {checkOut.toLocaleDateString("en-GB")}
            </strong>
          </div>

          <div>
            <span>Guests</span>
            <strong>{booking.guests}</strong>
          </div>

          <div>
            <span>Total</span>
            <strong>
              ₦{booking.totalPrice.toLocaleString()}
            </strong>
          </div>
        </div>

        <Link
          href={`/account/reservations/${booking.id}`}
          className={styles.reservations__link}
        >
          View reservation
        </Link>
      </div>
    </article>
  );
}