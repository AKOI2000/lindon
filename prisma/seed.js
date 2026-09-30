import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const apartments = [
  {
    slug: "lindon-freedom-way",
    name: "Lindon — Freedom Way",
    tagline: "A quiet one-bedroom base, two minutes from Freedom Way.",
    description:
      "A one-bedroom apartment two minutes from Freedom Way's restaurants, built for a traveller who wants a quiet place to sleep and work, and somewhere to eat within walking distance.",
    location: "Freedom Way, Lekki Phase 1",
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    guestCapacity: 2,
    pricePerNight: 120000,
    amenities: [
      "Wi-Fi",
      "Smart TV",
      "Kitchen",
      "Air conditioning",
      "Parking",
      "24/7 power",
    ],
    images: [
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957369/1789928373591_o2msej.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957380/1789928373101_cfyqb6.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957373/1789928373762_cuguto.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957375/bailey-alexander-PE4pFgcYzoQ-unsplash_ovfqzy.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957377/1789928373252_tndfan.jpg",
    ],
  },
  {
    slug: "lindon-admiralty",
    name: "Lindon — Admiralty",
    tagline: "Two bedrooms just off Admiralty Way.",
    description:
      "Two bedrooms just off Admiralty Way, close to the shops and eateries that run along it. A fit for two people travelling together, or one person who wants the extra room.",
    location: "Admiralty Way, Lekki Phase 1",
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    guestCapacity: 4,
    pricePerNight: 180000,
    amenities: [
      "Wi-Fi",
      "Smart TV",
      "Kitchen",
      "Air conditioning",
      "Parking",
      "24/7 power",
      "Washing machine",
    ],
    images: [
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957381/spacejoy-9M66C_w_ToM-unsplash_w9p8lm.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957388/spacejoy-RUvW1KGD9a4-unsplash_hy3ikd.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957366/1789928373831_t5jejw.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957372/1789928373043_dd9fct.jpg",
    ],
  },
  {
    slug: "lindon-chevron",
    name: "Lindon — Chevron",
    tagline: "Three bedrooms in a quieter part of Lekki.",
    description:
      "Three bedrooms in Chevron's quieter residential stretch, away from the traffic on the main roads. Built for a family or small group staying together, not four people packed into one living room.",
    location: "Chevron, Lekki",
    bedrooms: 3,
    bathrooms: 3,
    beds: 4,
    guestCapacity: 6,
    pricePerNight: 250000,
    amenities: [
      "Wi-Fi",
      "Smart TV",
      "Kitchen",
      "Air conditioning",
      "Parking",
      "24/7 power",
      "Washing machine",
      "Balcony",
    ],
    images: [
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957373/1789928373175_ennrwf.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957377/kara-eads-L7EwHkq1B2s-unsplash_gklhjt.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957380/salman-saqib-WaC-JFfF21M-unsplash_gkq3ct.jpg",
      "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1789957388/spacejoy-RUvW1KGD9a4-unsplash_hy3ikd.jpg",
    ],
  },
];

async function main() {
  for (const apartment of apartments) {
    await prisma.apartment.upsert({
      where: { slug: apartment.slug },
      update: apartment,
      create: apartment,
    });
  }
  console.log(`Seeded ${apartments.length} apartments.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
