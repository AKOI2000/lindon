"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  differenceInCalendarDays,
  format,
  startOfDay,
  subDays,
} from "date-fns";
import { signInWithGoogleFromApartment } from "@/app/actions/auth";
import styles from "./Availability.module.scss";
import BookingForm from "./BookingForm";

export default function Availability({ apartment, user, bookedDateRanges }) {
  const [range, setRange] = useState();

  const checkIn = range?.from;
  const checkOut = range?.to;

  const disabledBookedDates = useMemo(() => {
    return bookedDateRanges.map(({ checkIn, checkOut }) => ({
      from: startOfDay(new Date(checkIn)),
      to: subDays(startOfDay(new Date(checkOut)), 1),
    }));
  }, [bookedDateRanges]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    return differenceInCalendarDays(checkOut, checkIn);
  }, [checkIn, checkOut]);

  const total = nights * apartment.pricePerNight;

  return (
    <section className={styles.availability}>
      <div className={styles.availability__header}>
        <p className={styles.availability__eyebrow}>Availability</p>

        <h2 className={styles.availability__title}>Choose your dates.</h2>

        <p className={styles.availability__description}>
          Select your check-in and check-out dates to see the cost of your stay.
        </p>
      </div>

      <div className={styles.availability__booking}>
        <div className={styles.availability__calendarColumn}>
          <div className={styles.availability__calendar}>
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={2}
              disabled={[
                { before: startOfDay(new Date()) },
                ...disabledBookedDates,
              ]}
              excludeDisabled
            />
          </div>

          <div className={styles.availability__footer}>
            <div className={styles.availability__nightly}>
              <strong>{apartment.pricePerNight.toLocaleString()}</strong>

              <span>/ night</span>
            </div>

            {nights > 0 && (
              <>
                <span className={styles.availability__multiply}>
                  × {nights}
                </span>

                <div className={styles.availability__total}>
                  <span>Total</span>

                  <strong>{total.toLocaleString()}</strong>
                </div>
              </>
            )}

            <button
              className={styles.availability__clear}
              type="button"
              onClick={() => setRange(undefined)}
              disabled={!range}
            >
              Clear
            </button>
          </div>
        </div>

        <div className={styles.availability__login}>
          {!user ? (
            <form action={signInWithGoogleFromApartment}>
              <input
                type="hidden"
                name="redirectTo"
                value={`/apartments/${apartment.slug}`}
              />
              <p>
                Please{" "}
                <button
                  className={styles.availability__loginButton}
                  type="submit"
                >
                  login
                </button>{" "}
                to reserve this apartment right now.
              </p>
            </form>
          ) : (
            <BookingForm
              apartment={apartment}
              user={user}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          )}
        </div>
      </div>
    </section>
  );
}
