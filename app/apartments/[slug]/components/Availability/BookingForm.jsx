"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/actions/bookings";
import styles from "./Availability.module.scss";


export default function BookingForm({ apartment, user, checkIn, checkOut }) {
  const router = useRouter();

  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!checkIn || !checkOut) {
      setError("Please select your check-in and check-out dates.");

      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const booking = await createBooking({
        apartmentId: apartment.id,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests: Number(guests),
        notes: note,
      });
    } catch (error) {
      setError(
        error.message || "Something went wrong while creating your booking.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.availability__form} onSubmit={handleSubmit}>
      <div className={styles.availability__formHeader}>
        <p>You're booking as</p>

        <h3>{user.name}</h3>
      </div>

      <div className={styles.availability__formGroup}>
        <label htmlFor="guests">Guests</label>

        <input
          id="guests"
          name="guests"
          type="number"
          min="1"
          max={apartment.guestCapacity}
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
          required
        />
      </div>

      <div className={styles.availability__formGroup}>
        <label htmlFor="note">Note</label>

        <textarea
          id="note"
          name="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Anything we should know about your stay?"
        />
      </div>

      {error && <p className={styles.availability__error}>{error}</p>}

      <button
        className={styles.availability__submit}
        type="submit"
        disabled={!checkIn || !checkOut || isSubmitting}
      >
        {isSubmitting ? "Creating booking..." : "Continue to booking"}
      </button>
    </form>
  );
}
