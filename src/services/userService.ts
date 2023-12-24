import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export function getUserById(id: string) {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      profile: true,
    },
  });
}

export function getUserWithCompanyById(
  id: string,
): Promise<UserWithCompany | null> {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      company: true,
    },
  });
}

export function getProfileByUserId(id: string) {
  return prisma.profile.findFirst({
    where: {
      userId: id,
    },
  });
}

export type UserWithJobTrackers = Prisma.UserGetPayload<{
  include: {
    trackers: true;
  };
}>;

export type UserWithCompany = Prisma.UserGetPayload<{
  include: {
    company: true;
  };
}>;

export function getUserWithJobTrackersById(
  id: string,
): Promise<UserWithJobTrackers | null> {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      trackers: true,
    },
  });
}
