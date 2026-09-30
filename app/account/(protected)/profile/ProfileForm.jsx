"use client";

import { useState } from "react";
import { updatePhoneNumber } from "@/app/actions/profile";
import styles from "./Profile.module.scss";

export default function ProfileForm({ phone }) {
  const [value, setValue] = useState(phone);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      await updatePhoneNumber(value);
      setMessage("Phone number updated.");
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong while updating your phone number.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={styles.profile__form}
      onSubmit={handleSubmit}
    >
      <div className={styles.profile__field}>
        <label htmlFor="phone">Phone number</label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="+234..."
          autoComplete="tel"
        />
      </div>

      {message && (
        <p className={styles.profile__success}>
          {message}
        </p>
      )}

      {error && (
        <p className={styles.profile__error}>
          {error}
        </p>
      )}

      <button
        type="submit"
        className={styles.profile__button}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}