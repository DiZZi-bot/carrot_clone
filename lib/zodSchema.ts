import { z } from "zod";
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  TWEET_MAX_LENGTH,
  RESPONSE_MAX_LENGTH,
  KEYWORD_MIN_LENGTH,
  KEYWORD_MAX_LENGTH,
  BIO_MAX_LENGTH,
} from "@/lib/constants";
import db from "@/lib/db";
import {
  checkUniqueEmail,
  checkUniqueUsername,
} from "@/app/service/profile-edit-service";
import getSession from "./session";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

export const createAccountSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required.",
      })
      .trim()
      .email("Please enter a valid email address.")
      .refine(
        (email) => email.includes("@zod.com"),
        "Only @zod.com email addresses are allowed.",
      ),
    username: z
      .string({
        invalid_type_error: "Username must be a string.",
        required_error: "Username is required.",
      })
      .trim()
      .min(
        USERNAME_MIN_LENGTH,
        `Username should be at least ${USERNAME_MIN_LENGTH} characters long.`,
      )
      .max(
        USERNAME_MAX_LENGTH,
        `Username should be at most ${USERNAME_MAX_LENGTH} characters long.`,
      ),
    password: z
      .string({
        required_error: "Password is required.",
      })
      .trim()
      .min(
        PASSWORD_MIN_LENGTH,
        `Password should be at least ${PASSWORD_MIN_LENGTH} characters long.`,
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string({
        required_error: "Confirm Password is required.",
      })
      .trim(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: { username },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export const loginAccountSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .trim()
    .email("Please enter a valid email address.")
    .toLowerCase()
    //.refine(checkEmailExists, "An account with this email does not exist."),
    .superRefine(async (email, ctx) => {
      const user = await db.user.findUnique({
        where: { email },
        select: { id: true },
      });
      if (!user) {
        ctx.addIssue({
          code: "custom",
          message: "An account with this email does not exist.",
        });
      }
    }),
  password: z.string({
    required_error: "Password is required.",
  }),
});

export const createTweetSchema = z.object({
  tweet: z
    .string({
      required_error: "Tweet cannot be empty.",
    })
    .trim()
    .max(
      TWEET_MAX_LENGTH,
      `Tweet cannot exceed ${TWEET_MAX_LENGTH} characters.`,
    ),
});

export const creatResponseSchema = z.object({
  response: z
    .string({
      required_error: "Response cannot be empty.",
    })
    .trim()
    .max(
      RESPONSE_MAX_LENGTH,
      `Response cannot exceed ${RESPONSE_MAX_LENGTH} characters.`,
    ),
});

export const keywordSchema = z
  .string({
    required_error: "Search word is required.",
  })
  .trim()
  .min(
    KEYWORD_MIN_LENGTH,
    `Searcg word should be at least ${KEYWORD_MIN_LENGTH} characters long.`,
  )
  .max(
    KEYWORD_MAX_LENGTH,
    `Searcg word should be at least ${KEYWORD_MAX_LENGTH} characters long.`,
  );

export const profileSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .trim()
      .email("Please enter a valid email address."),
    username: z
      .string({ required_error: "Username is required." })
      .trim()
      .min(
        USERNAME_MIN_LENGTH,
        `Username should be at least ${USERNAME_MIN_LENGTH} characters long.`,
      )
      .max(
        USERNAME_MAX_LENGTH,
        `Username should be at most ${USERNAME_MAX_LENGTH} characters long.`,
      ),
    password: z.string({ required_error: "Password is required." }),
    newPassword: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Password should be at least ${PASSWORD_MIN_LENGTH} characters long.`,
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    bio: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || value.length <= BIO_MAX_LENGTH, {
        message: `Bio must be ${BIO_MAX_LENGTH} characters or less.`,
      }),
  })
  .superRefine(async (data, ctx) => {
    const session = await getSession();
    const isEmailAvailable = await checkUniqueEmail(data.email, session.id);
    if (!isEmailAvailable) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already in use.",
        path: ["email"],
        fatal: true,
      });
    }
  })
  .superRefine(async (data, ctx) => {
    const session = await getSession();
    const isEmailAvailable = await checkUniqueUsername(
      data.username,
      session.id,
    );
    if (!isEmailAvailable) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already in use.",
        path: ["username"],
        fatal: true,
      });
    }
  });
