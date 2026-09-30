"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { FiCalendar, FiChevronDown, FiSearch } from "react-icons/fi";
import styles from "./BookingSearch.module.scss";

export default function BookingSearch({ apartments }) {
  const [openField, setOpenField] = useState(null);

  const [selectedApartment, setSelectedApartment] = useState(null);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();

  const [unavailableDates, setUnavailableDates] = useState([]);
  const [loadingDates, setLoadingDates] = useState(false);

  useEffect(() => {
    if (!selectedApartment) {
      setUnavailableDates([]);
      return;
    }

    async function loadAvailability() {
      try {
        setLoadingDates(true);

        const response = await fetch(
          `/api/apartments/${selectedApartment.id}/availability`
        );

        if (!response.ok) {
          throw new Error("Failed to load availability");
        }

        const data = await response.json();

        setUnavailableDates(
          data.bookings.map((booking) => ({
            from: parseISO(booking.checkIn),
            to: parseISO(booking.checkOut),
          }))
        );
      } catch (error) {
        console.error("Failed to load apartment availability:", error);
        setUnavailableDates([]);
      } finally {
        setLoadingDates(false);
      }
    }

    loadAvailability();
  }, [selectedApartment]);

  function handleApartmentSelect(apartment) {
    setSelectedApartment(apartment);

    setCheckIn(undefined);
    setCheckOut(undefined);

    setOpenField("checkIn");
  }

  function handleCheckInSelect(date) {
    setCheckIn(date);
    setCheckOut(undefined);

    if (date) {
      setOpenField("checkOut");
    }
  }

  function handleCheckOutSelect(date) {
    setCheckOut(date);
    setOpenField(null);
  }

  function handleSearch() {
    if (!selectedApartment || !checkIn || !checkOut) {
      return;
    }

    const params = new URLSearchParams({
      apartment: selectedApartment.slug,
      checkIn: format(checkIn, "yyyy-MM-dd"),
      checkOut: format(checkOut, "yyyy-MM-dd"),
    });

    window.location.href = `/apartments?${params.toString()}`;
  }

  const today = new Date();

  const checkInDisabled = [
    { before: today },
    ...unavailableDates,
  ];

  const checkOutDisabled = [
    { before: checkIn || today },
    ...unavailableDates,
  ];

  return (
    <div className={styles.bookingSearch}>
      <div className={styles.fieldWrapper}>
        <button
          type="button"
          className={styles.field}
          onClick={() =>
            setOpenField(openField === "where" ? null : "where")
          }
        >
          <span className={styles.fieldLabel}>Where</span>

          <span className={styles.fieldValue}>
            {selectedApartment
              ? selectedApartment.name
              : "Choose an apartment"}
          </span>

          <FiChevronDown
            className={openField === "where" ? styles.rotated : ""}
          />
        </button>

        {openField === "where" && (
          <div className={styles.dropdown}>
            {apartments.map((apartment) => (
              <button
                key={apartment.id}
                type="button"
                className={styles.apartmentOption}
                onClick={() => handleApartmentSelect(apartment)}
              >
                <span>
                  <strong>{apartment.name}</strong>
                  <small>{apartment.location}</small>
                </span>

                <span className={styles.price}>
                  ₦{apartment.pricePerNight.toLocaleString()}
                  <small>/ night</small>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.fieldWrapper}>
        <button
          type="button"
          className={`${styles.field} ${
            !selectedApartment ? styles.disabled : ""
          }`}
          onClick={() => {
            if (selectedApartment) {
              setOpenField(openField === "checkIn" ? null : "checkIn");
            }
          }}
        >
          <span className={styles.fieldLabel}>Check in</span>

          <span className={styles.fieldValue}>
            {checkIn ? format(checkIn, "dd MMM yyyy") : "Add date"}
          </span>

          <FiCalendar />
        </button>

        {openField === "checkIn" && selectedApartment && (
          <div className={styles.calendar}>
            <DayPicker
              mode="single"
              selected={checkIn}
              onSelect={handleCheckInSelect}
              disabled={checkInDisabled}
              showOutsideDays
              weekStartsOn={1}
            />

            {loadingDates && (
              <p className={styles.calendarMessage}>
                Checking availability...
              </p>
            )}
          </div>
        )}
      </div>

      <div className={styles.fieldWrapper}>
        <button
          type="button"
          className={`${styles.field} ${
            !checkIn ? styles.disabled : ""
          }`}
          onClick={() => {
            if (checkIn) {
              setOpenField(openField === "checkOut" ? null : "checkOut");
            }
          }}
        >
          <span className={styles.fieldLabel}>Check out</span>

          <span className={styles.fieldValue}>
            {checkOut ? format(checkOut, "dd MMM yyyy") : "Add date"}
          </span>

          <FiCalendar />
        </button>

        {openField === "checkOut" && checkIn && (
          <div className={styles.calendar}>
            <DayPicker
              mode="single"
              selected={checkOut}
              onSelect={handleCheckOutSelect}
              disabled={checkOutDisabled}
              showOutsideDays
              weekStartsOn={1}
            />
          </div>
        )}
      </div>

      <button
        type="button"
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={!selectedApartment || !checkIn || !checkOut}
      >
        <FiSearch />
        <span>Search availability</span>
      </button>
    </div>
  );
}