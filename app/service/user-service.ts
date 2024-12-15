"use server";

import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

export async function LogOut() {
  "use server";
  const session = await getSession();
  await session.destroy();
  redirect("/log-in");
}

export async function GetUser() {
  const sessionId = (await getSession()).id;
  if (sessionId) {
    const user = await db.user.findUnique({
      where: {
        id: sessionId,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export async function GetUserDetail({ username }: { username: string }) {
  const sessionId = (await getSession()).id;
  if (sessionId) {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        bio: true,
      },
    });
    if (user) {
      return { ...user, isMyProfile: sessionId === user.id };
    }
  }
  notFound();
}

export async function getUserByEmail(email: string) {
  const sessionId = (await getSession()).id;
  if (sessionId) {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export async function getUserPassword() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      password: true,
    },
  });
  return user;
}

export async function getUserProfileInformation() {
  const sessionId = (await getSession()).id;
  const user = await db.user.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      tweets: {
        include: {
          user: true,
        },
      },
    },
  });
  if (user) {
    return user;
  }
  notFound();
}
export type InitialUserInformationType = Prisma.PromiseReturnType<
  typeof getUserProfileInformation
>;
