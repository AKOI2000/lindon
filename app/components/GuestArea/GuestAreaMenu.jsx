"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import styles from "./GuestArea.module.scss";

export default function GuestAreaMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <div className={styles.menu} ref={menuRef}>
      <button
        className={styles.menu__trigger}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt=""
            width={32}
            height={32}
            className={styles.menu__avatar}
          />
        ) : (
          <span className={styles.menu__avatarFallback}>
            {user.name?.charAt(0) || "G"}
          </span>
        )}

        <span>Guest Area</span>

        <span
          className={`${styles.menu__chevron} ${
            isOpen ? styles.menu__chevronOpen : ""
          }`}
          aria-hidden="true"
        >
          ↓
        </span>
      </button>

      {isOpen && (
        <div className={styles.menu__dropdown} role="menu">
          <div className={styles.menu__user}>
            <strong>{user.name || "Guest"}</strong>

            <span>{user.email}</span>
          </div>

          <div className={styles.menu__divider} />

          <Link
            href="/account"
            className={styles.menu__item}
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Account
          </Link>

          <Link
            href="/account/reservations"
            className={styles.menu__item}
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Reservations
          </Link>

          <div className={styles.menu__divider} />

          <button
            className={styles.menu__logout}
            type="button"
            role="menuitem"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}