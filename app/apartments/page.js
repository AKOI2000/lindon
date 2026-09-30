import GuestArea from "../components/GuestArea/GuestArea";
import Header from "../components/Header";
import ApartmentGrid from "./components/ApartmentGrid/ApartmentGrid";
import { getActiveApartments } from "@/lib/queries/apartments";

export const metadata = {
  title: "Apartments",
  description:
    "Explore Lindon's shortlet apartments across Lekki, Lagos. View each stay, amenities, pricing and availability.",
};

export default async function ApartmentsPage() {
  const apartments = await getActiveApartments();

  return (
    <>
      <Header>
        <GuestArea />
      </Header>

      <main>
        <section className="page-heading">
          <p className="eyebrow">Apartments</p>

          <h1>Find a place that fits your stay.</h1>

          <p className="description">
            Explore the apartments available at Lindon.
          </p>
        </section>

        <ApartmentGrid apartments={apartments} />
      </main>
    </>
  );
}
