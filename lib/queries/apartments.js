import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getActiveApartments = unstable_cache(
  async () => {
    try {
      return await prisma.apartment.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          slug: true,
          name: true,
          location: true,
          bedrooms: true,
          guestCapacity: true,
          pricePerNight: true,
          images: true,
        },
      });
    } catch (error) {
      console.error("Failed to fetch apartments:", error);
      return [];
    }
  },
  ["active-apartments"],
  {
    // revalidate: 3600,
    tags: ["apartments"],
  },
);

export async function getApartmentBySlug(slug) {
  const getCachedApartment = unstable_cache(
    async () => {
      try {
        return await prisma.apartment.findUnique({
          where: {
            slug,
          },
          select: {
            id: true,
            slug: true,
            name: true,
            location: true,
            description: true,
            bedrooms: true,
            guestCapacity: true,
            pricePerNight: true,
            images: true,
            amenities: true,
          },
        });
      } catch (error) {
        console.error("Failed to fetch apartment:", error);
        return null;
      }
    },
    [`apartment-${slug}`],
    {
      // revalidate: 3600,
      tags: [`apartment-${slug}`, "apartments"],
    },
  );

  return getCachedApartment();
}
