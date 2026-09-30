"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePhoneNumber(phone) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  const cleanPhone = phone?.trim() || null;

  if (cleanPhone && cleanPhone.length < 7) {
    throw new Error("Please enter a valid phone number.");
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        phone: cleanPhone,
      },
    });

    revalidatePath("/account/profile");
    revalidatePath("/account");
  } catch (error) {
    console.error("Failed to update phone number:", error);
    throw new Error("Something went wrong while updating your details.");
  }
}