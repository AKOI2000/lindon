import { notFound } from "next/navigation";
import Header from "../../components/Header";
import ApartmentHero from "./components/ApartmentHero/ApartmentHero";
import ApartmentGallery from "./components/ApartmentGallery/ApartmentGallery";
import ApartmentAmenities from "./components/ApartmentAmenities/ApartmentAmenities";
import Availability from "./components/Availability/Availability";
import { getApartmentBySlug } from "@/lib/queries/apartments";
import { getCurrentUser } from "@/lib/auth/auth";
import { getBookedDateRanges } from "@/lib/queries/bookings";
import GuestArea from "@/app/components/GuestArea/GuestArea";

export default async function ApartmentPage({ params }) {
  const { slug } = await params;

  const apartment = await getApartmentBySlug(slug);
  const user = await getCurrentUser();

  if (!apartment) {
    notFound();
  }

  const bookedDateRanges = await getBookedDateRanges(apartment.id);

  return (
    <>
      <Header>
        <GuestArea />
      </Header>

      <main>
        <ApartmentHero apartment={apartment} />

        <ApartmentGallery images={apartment.images} />

        <ApartmentAmenities amenities={apartment.amenities} />

        <Availability
          apartment={apartment}
          user={user}
          bookedDateRanges={bookedDateRanges}
        />
      </main>
    </>
  );
}
