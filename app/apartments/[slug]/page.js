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


export async function generateMetadata({ params }) {
  const { slug } = await params;

  const apartment = await getApartmentBySlug(slug);

  if (!apartment) {
    return {
      title: "Apartment Not Found | Lindon",
    };
  }

  return {
    title: apartment.name,

    description:
      apartment.description ||
      `Explore ${apartment.name}, a shortlet apartment in ${apartment.location}, Lagos.`,

    openGraph: {
      title: `${apartment.name} | Lindon`,
      description:
        apartment.description ||
        `Explore ${apartment.name}, a shortlet apartment in ${apartment.location}, Lagos.`,
      type: "website",
      images: [
        {
          url: apartment.images[0],
          alt: apartment.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${apartment.name} | Lindon`,
      description:
        apartment.description ||
        `Explore ${apartment.name}, a shortlet apartment in ${apartment.location}, Lagos.`,
      images: [apartment.images[0]],
    },
  };
}

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
