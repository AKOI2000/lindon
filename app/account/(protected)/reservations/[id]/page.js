import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  getBookingForUser,
  getBookedDateRangesForEdit,
} from "@/lib/queries/bookings";
import ReservationActions from "./components/ReservationActions/ReservationActions";
import styles from "./Reservation.module.scss";

export default async function ReservationPage({ params }) {
  const { id } = await params;

  const session = await auth();

  const booking = await getBookingForUser(
    id,
    session.user.id,
  );

  if (!booking) {
    notFound();
  }

  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);

  const isPast = checkOut <= new Date();
  const isCancelled = booking.status === "CANCELLED";
  const canModify = !isPast && !isCancelled;

  const bookedDateRanges = canModify
    ? await getBookedDateRangesForEdit(
        booking.apartment.id,
        booking.id,
      )
    : [];

  return (
    <div className={styles.reservation}>
      <header className={styles.reservation__header}>
        <Link
          href="/account/reservations"
          className={styles.reservation__back}
        >
          ← Reservations
        </Link>

        <p className={styles.reservation__eyebrow}>
          Reservation
        </p>

        <h1 className={styles.reservation__title}>
          {booking.apartment.name}
        </h1>

        <p className={styles.reservation__location}>
          {booking.apartment.location}
        </p>
      </header>

      <div className={styles.reservation__layout}>
        <div className={styles.reservation__main}>
          <div className={styles.reservation__image}>
            <Image
              src={booking.apartment.images[0]}
              alt={booking.apartment.name}
              fill
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </div>

          <section className={styles.reservation__section}>
            <p className={styles.reservation__eyebrow}>
              Stay details
            </p>

            <div className={styles.reservation__details}>
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
                <span>Reference</span>
                <strong>{booking.reference}</strong>
              </div>
            </div>
          </section>

          {booking.notes && (
            <section className={styles.reservation__section}>
              <p className={styles.reservation__eyebrow}>
                Your note
              </p>

              <p className={styles.reservation__notes}>
                {booking.notes}
              </p>
            </section>
          )}

          {canModify && (
            <ReservationActions
              booking={booking}
              bookedDateRanges={bookedDateRanges}
            />
          )}
        </div>

        <aside className={styles.reservation__aside}>
          <div className={styles.reservation__summary}>
            <p className={styles.reservation__eyebrow}>
              Reservation total
            </p>

            <strong className={styles.reservation__total}>
              ₦{booking.totalPrice.toLocaleString()}
            </strong>

            <span
              className={`${styles.reservation__status} ${
                isCancelled
                  ? styles.reservation__statusCancelled
                  : ""
              }`}
            >
              {booking.status}
            </span>
          </div>

          {isCancelled && (
            <p className={styles.reservation__cancelledMessage}>
              This reservation has been cancelled.
            </p>
          )}

          {!isPast && !isCancelled && (
            <p className={styles.reservation__help}>
              Need help with your stay? Contact Lindon.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}