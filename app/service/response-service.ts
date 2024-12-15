"use server";

import { revalidateTag } from "next/cache";
import { Prisma } from "@prisma/client";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { creatResponseSchema } from "@/lib/zodSchema";
import { typeToFlattenedError } from "zod";
import { redirect } from "next/navigation";

export async function getInitialResponse(tweetId: number) {
  const responses = await db.response.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      response: true,
      created_at: true,
      user: {
        select: { id: true, username: true },
      },
    },
  });
  const responseCount = await db.response.count({
    where: { tweetId },
  });
  return {
    responses,
    responseCount,
  };
}

export type InitialResponses = Prisma.PromiseReturnType<
  typeof getInitialResponse
>;

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<{ response: string }, string> | null;
  redirectToLogin?: boolean;
}

export async function handleCreateResponse(
  _: unknown,
  formData: FormData,
): Promise<FormState> {
  const tweetId = Number(formData.get("tweetId"));
  console.log(`handleCreateResponse-getTweetId: ${tweetId}`);
  const session = await getSession();

  if (!session?.id) {
    return {
      isSuccess: false,
      error: null,
      redirectToLogin: true,
    };
  }

  const data = {
    response: formData.get("response"),
  };

  const result = await creatResponseSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return {
      error: result.error?.flatten(),
      isSuccess: false,
    };
  }

  let newResponse = null;
  try {
    newResponse = await db.response.create({
      data: {
        response: result.data.response,
        userId: session.id,
        tweetId: tweetId,
      },
    });
    console.log(newResponse);
    return {
      isSuccess: true,
      error: null,
    };
  } catch {
    return {
      isSuccess: false,
      error: {
        fieldErrors: {
          response: ["Failed to create response. Please try again."],
        },
        formErrors: [],
      },
    };
  } finally {
    if (newResponse) {
      revalidateTag(`tweet-responses-${tweetId}`);
      redirect(`/tweets/${tweetId}`);
    }
  }
}
