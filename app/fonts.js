import { Changa_One, Google_Sans } from "next/font/google";
import localFont from "next/font/local";

export const changaOne = Changa_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

export const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

// export const monumentGrotesk = localFont({
//   variable: "--font-body",
//   display: "swap",
//   fallback: ["Arial", "sans-serif"],
//   src: [
//     {
//       path: "../fonts/MonumentGrotesk-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/MonumentGrotesk-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../fonts/MonumentGrotesk-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/MonumentGrotesk-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "../fonts/MonumentGrotesk-MediumItalic.woff2",
//       weight: "500",
//       style: "italic",
//     },
//     {
//       path: "../fonts/MonumentGrotesk-BoldItalic.woff2",
//       weight: "700",
//       style: "italic",
//     },
//   ],
// });
