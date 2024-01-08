"use server";

import { auth } from "@/auth";
import { cvTag } from "@/lib/cache-tags";
import prisma from "@/lib/db";
import knock from "@/lib/knock";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { deleteFile, getUrlFor, uploadFile } from "@/services/BlobService";
import {
  getCvById,
  getUserById,
  getUserWithCvsById,
} from "@/services/UserService";
import { PreferenceSet } from "@knocklabs/node";
import { UploadedCv } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

export async function updateNotificationSettings(preferences: PreferenceSet) {
  const session = await auth();
  if (!session || !session.user) return;

  console.log(
    "Updating notification settings for user",
    session.user.id,
    preferences,
  );

  return await knock.users.setPreferences(session.user.id, preferences);
}

export async function deleteCv(cvId: UploadedCv["id"]) {
  const session = await auth();
  if (!session || !session.user) return;

  const user = await getUserById(session.user.id);
  if (!user) return;

  const cv = await getCvById(cvId);
  if (!cv) return;

  console.log("Deleting cv", cvId, "for user", user.id);

  // Try to delete from blob storage
  const fileName = cv.file.split("/").pop()?.split("?")[0] ?? "";

  console.log("Deleting cv from blob storage:", fileName);
  const result = await deleteFile("cvs", fileName);
  if (result.errorCode) {
    console.error("Failed to delete cv from blob storage", result);
  }

  await prisma.uploadedCv.delete({
    where: {
      id: cvId,
    },
  });

  revalidateTag(cvTag);
}

export async function updateProfile(
  values: z.infer<typeof updateProfileFormSchema>,
) {
  console.log("Updating profile");

  // This will throw an error if the state is invalid
  const validatedState = updateProfileFormSchema.parse(values);

  const session = await auth();
  if (!session || !session.user) throw new Error("User not found");

  const user = await getUserById(session.user.id);
  if (!user) throw new Error("User not found");

  console.log("Updating profile:", validatedState, "for user:", user);

  const result = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: {
      id: user.id,
      firstName: validatedState.firstName,
      lastName: validatedState.lastName,
      dateOfBirth: validatedState.dateOfBirth,
      email: validatedState.email,
    },
    update: {
      firstName: validatedState.firstName,
      lastName: validatedState.lastName,
      dateOfBirth: validatedState.dateOfBirth,
      email: validatedState.email,
    },
  });

  revalidatePath("/settings/profile");

  console.log("Successfully updated", user.firstName, "profile.");
  return result;
}

export async function uploadCv(formData: FormData) {
  const cv = formData.get("cv") as File;
  const buffer = await cv.arrayBuffer();

  console.log("Uploading cv", cv, buffer);

  if (!cv) throw new Error("No cv found in form data");

  const session = await auth();
  if (!session || !session.user) throw new Error("User not found");

  const user = await getUserWithCvsById(session.user.id);
  if (!user) throw new Error("User not found");

  // Upload cv to blob storage
  console.log("Uploading file:", cv);

  const fileName = uuidv4() + cv.name;
  const response = await uploadFile("cvs", buffer, cv.type, fileName);
  const url = getUrlFor("cvs", fileName);

  console.log("Successfully uploaded cv to blob storage", url);

  console.log("Uploading cv to blob storage");

  // Create cv object on user
  const result = await prisma.uploadedCv.create({
    data: {
      name: cv.name,
      file: url,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  revalidatePath("/settings/profile");

  console.log(user, "is uploading cv", cv, "with result:", result);
}

// export async function uploadProfilePicture(formData: FormData) {
//   console.log("Uploading profile picture");
//
//   const session = await auth();
//   if (!session || !session.user) throw new Error("User not found");
//
//   const user = await getUserById(session.user.id);
//   if (!user) throw new Error("User not found");
//
//   console.log("Uploading profile picture for user:", user);
//
//   const result = await prisma.user.upsert({
//     where: {
//       id: user.id,
//     },
//     create: {
//       id: user.id,
//       profilePicture: file,
//     },
//     update: {
//       profilePicture: file,
//     },
//   });
//
//   console.log("Successfully uploaded profile picture for", user.firstName);
//   return result;
// }
