import Footer from "./components/Footer";
import { changaOne, googleSans } from "./fonts";
import "@/styles/globals.scss";
import "react-day-picker/style.css";

export const metadata = {
  metadataBase: new URL("https://lindon.vercel.app"),

  title: {
    default: "Lindon | Shortlet Apartments in Lekki, Lagos",
    template: "%s | Lindon",
  },

  description:
    "Discover thoughtfully designed shortlet apartments in Lekki, Lagos. Explore available stays, check dates, and reserve your apartment with Lindon.",

  keywords: [
    "shortlet apartments in Lekki",
    "Lekki shortlets",
    "shortlet apartments Lagos",
    "serviced apartments Lekki",
    "Lagos shortlet apartments",
  ],

  openGraph: {
    title: "Lindon | Shortlet Apartments in Lekki, Lagos",
    description:
      "Discover thoughtfully designed shortlet apartments in Lekki, Lagos. Explore available stays, check dates, and reserve your apartment with Lindon.",
    type: "website",
    locale: "en_NG",
    siteName: "Lindon",
    images: [
      {
        url: "/lindon-stay.jpg",
        width: 1200,
        height: 630,
        alt: "Lindon shortlet apartment in Lekki, Lagos",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Lindon | Shortlet Apartments in Lekki, Lagos",
    description:
      "Discover thoughtfully designed shortlet apartments in Lekki, Lagos. Explore available stays, check dates, and reserve your apartment with Lindon.",
    images: ["/lindon-stay.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${changaOne.variable} ${googleSans.variable}`}
    >
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}