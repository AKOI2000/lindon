import Link from "next/link";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>Lindon</span>
          <p className={styles.tagline}>
            Furnished apartments in Lekki, ready when you are.
          </p>
        </div>

        <div className={styles.columns}>
          <div className={styles.col}>
            <h6>Explore</h6>
            <Link href="/apartments">Apartments</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={styles.col}>
            <h6>Get in touch</h6>
            <a href="tel:+2340000000000" className={styles.contactLine}>
              <HiOutlinePhone size={16} /> +234 000 000 0000
            </a>
            <a href="mailto:hello@lindon.ng" className={styles.contactLine}>
              <HiOutlineMail size={16} /> hello@lindon.ng
            </a>
            <span className={styles.contactLine}>
              <HiOutlineLocationMarker size={16} /> Lekki, Lagos
            </span>
          </div>

          <div className={styles.col}>
            <h6>Follow</h6>
            <a
              href="https://wa.me/2340000000000"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLine}
            >
              <FaWhatsapp size={16} /> WhatsApp
            </a>

            <a
              href="https://instagram.com/lindon"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLine}
            >
              <FaInstagram size={16} /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Lindon. All rights reserved.</span>
        <span>Lekki, Lagos</span>
      </div>
    </footer>
  );
}
