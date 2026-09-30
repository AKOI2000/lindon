"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import styles from "./Header.module.scss";

const NAV_LINKS = [
  { href: "/apartments", label: "Apartments", disabled: false },
  { href: "/about", label: "About", disabled: false },
  { href: "/services", label: "Services", disabled: true },
  { href: "/contact", label: "Contact", disabled: true },
];

export default function Header({ transparent = false, children }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkScroll = useCallback(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.05);
  }, []);

  useEffect(() => {
    if (!transparent) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });

        ticking = true;
      }
    };

    checkScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [transparent, checkScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isSolid = !transparent || scrolled;

  return (
    <>
      <header
        className={`${styles.header} ${
          isSolid ? styles.solid : styles.transparent
        }`}
      >
        <div className={styles.inner}>
          <Link
            href="/"
            className={`${styles.logo} ${
              menuOpen ? styles.logoOpen : ""
            }`}
          >
            Lindon
          </Link>

          <nav className={styles.nav}>
            {NAV_LINKS.map((link) =>
              link.disabled ? (
                <span
                  key={link.href}
                  className={`${styles.navLink} ${styles.navLinkDisabled}`}
                  aria-disabled="true"
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.navLink}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className={styles.actions}>
            {children}

            <button
              className={`${styles.menuToggle} ${
                menuOpen ? styles.menuToggleOpen : ""
              }`}
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <HiOutlineX size={24} />
              ) : (
                <HiOutlineMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.mobileDrawer} ${
          menuOpen ? styles.open : ""
        }`}
      >
        <nav className={styles.mobileNav}>
          {NAV_LINKS.map((link) =>
            link.disabled ? (
              <span
                key={link.href}
                className={`${styles.mobileNavLink} ${styles.mobileNavLinkDisabled}`}
                aria-disabled="true"
              >
                {link.label}
              </span>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={styles.mobileNavLink}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </>
  );
}