"use client";

import { useState } from "react";
import EditReservation from "../EditReservation/EditReservation";
import { cancelBooking } from "@/app/actions/bookings";
import styles from "./ReservationActions.module.scss";

export default function ReservationActions({
  booking,
  bookedDateRanges,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState("");

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?",
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setIsCancelling(true);

    try {
      await cancelBooking(booking.id);

      window.location.reload();
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong while cancelling your reservation.",
      );
    } finally {
      setIsCancelling(false);
    }
  }

  if (isEditing) {
    return (
      <EditReservation
        booking={booking}
        bookedDateRanges={bookedDateRanges}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <section className={styles.actions}>
      <div className={styles.actions__buttons}>
        <button
          type="button"
          className={styles.actions__edit}
          onClick={() => setIsEditing(true)}
        >
          Edit reservation
        </button>

        <button
          type="button"
          className={styles.actions__cancel}
          onClick={handleCancel}
          disabled={isCancelling}
        >
          {isCancelling ? "Cancelling..." : "Cancel reservation"}
        </button>
      </div>

      {error && (
        <p className={styles.actions__error}>
          {error}
        </p>
      )}
    </section>
  );
}