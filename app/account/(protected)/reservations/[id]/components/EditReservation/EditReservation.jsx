"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  differenceInCalendarDays,
  startOfDay,
  subDays,
} from "date-fns";
import { updateBooking } from "@/app/actions/bookings";
import styles from "./EditReservation.module.scss";

export default function EditReservation({
  booking,
  bookedDateRanges,
  onClose,
}) {
  const [range, setRange] = useState({
    from: new Date(booking.checkIn),
    to: new Date(booking.checkOut),
  });

  const [guests, setGuests] = useState(booking.guests);
  const [notes, setNotes] = useState(booking.notes || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disabledBookedDates = useMemo(() => {
    return bookedDateRanges.map(({ checkIn, checkOut }) => ({
      from: startOfDay(new Date(checkIn)),
      to: subDays(startOfDay(new Date(checkOut)), 1),
    }));
  }, [bookedDateRanges]);

  const nights = useMemo(() => {
    if (!range?.from || !range?.to) {
      return 0;
    }

    return differenceInCalendarDays(range.to, range.from);
  }, [range]);

  const total = nights * booking.apartment.pricePerNight;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!range?.from || !range?.to) {
      setError("Please select your check-in and check-out dates.");
      return;
    }

    if (nights < 1) {
      setError("Check-out must be after check-in.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await updateBooking({
        bookingId: booking.id,
        checkIn: range.from.toISOString(),
        checkOut: range.to.toISOString(),
        guests: Number(guests),
        notes,
      });

      window.location.reload();
    } catch (error) {
      setError(
        error.message || "Something went wrong while updating your reservation.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.edit}>
      <div className={styles.edit__header}>
        <div>
          <p className={styles.edit__eyebrow}>Edit reservation</p>
          <h2 className={styles.edit__title}>
            Update your stay.
          </h2>
        </div>

        <button
          type="button"
          className={styles.edit__close}
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.edit__field}>
          <label>Dates</label>

          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            disabled={[
              { before: startOfDay(new Date()) },
              ...disabledBookedDates,
            ]}
            excludeDisabled
          />
        </div>

        <div className={styles.edit__field}>
          <label htmlFor="guests">Guests</label>

          <select
            id="guests"
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
          >
            {Array.from(
              { length: booking.apartment.guestCapacity },
              (_, index) => index + 1,
            ).map((number) => (
              <option key={number} value={number}>
                {number} {number === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.edit__field}>
          <label htmlFor="notes">Note</label>

          <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={5}
            placeholder="Anything we should know?"
          />
        </div>

        <div className={styles.edit__summary}>
          <span>
            {nights} {nights === 1 ? "night" : "nights"}
          </span>

          <strong>
            ₦{total.toLocaleString()}
          </strong>
        </div>

        {error && (
          <p className={styles.edit__error}>
            {error}
          </p>
        )}

        <div className={styles.edit__actions}>
          <button
            type="button"
            className={styles.edit__cancel}
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={styles.edit__submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}