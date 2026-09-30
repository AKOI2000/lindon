import Footer from "./components/Footer";
// import Header from './components/Header'
import { changaOne, googleSans } from "./fonts";
import "@/styles/globals.scss";
import "react-day-picker/style.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${changaOne.variable} ${googleSans.variable}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
