import Header from "../components/Header";
import AboutHero from "./components/AboutHero/AboutHero";
import AboutLocations from "./components/AboutLocations/AboutLocations";
import AboutStay from "./components/AboutStay/AboutStay";
import AboutStory from "./components/AboutStory/AboutStory";
import AboutCTA from "./components/AboutCTA/AboutCTA";
import GuestArea from "../components/GuestArea/GuestArea";

export const metadata = {
  title: "About Lindon",
  description:
    "Learn more about Lindon and our approach to shortlet stays in Lekki, Lagos.",
};

export default function AboutPage() {
  return (
    <>
      <Header>
        <GuestArea />
      </Header>
      <main>
        <AboutHero />
        <AboutStory />
        <AboutLocations />
        <AboutStay />
        <AboutCTA />
      </main>
    </>
  );
}
