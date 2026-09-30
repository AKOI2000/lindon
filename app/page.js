import Header from "./components/Header";
import Hero from "./components/Hero/Hero";
import FeaturedApartments from "./components/FeaturedApartments/FeaturedApartments";
import LindonExperience from "./components/LindonExperience/LindonExperience";
import { getActiveApartments } from "@/lib/queries/apartments";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import LocationSection from "./components/LocationSection/LocationSection";
import FinalCTA from "./components/FinalCTA/FinalCTA";
import GuestArea from "./components/GuestArea/GuestArea";
import { getCurrentUser } from "@/lib/auth/auth";

export default async function Home() {
  const apartments = await getActiveApartments();
  

  return (
    <>
      <Header transparent>
        <GuestArea/>
      </Header>

      <main>
        <Hero apartments={apartments} />
        <FeaturedApartments apartments={apartments} />
        <LindonExperience />
        <HowItWorks />
        <LocationSection />
        <FinalCTA />
      </main>
    </>
  );
}
