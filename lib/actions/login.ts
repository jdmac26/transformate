"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "./user.actions";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  
  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  console.log(existingUser);
  
  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist!" }
  } 
  try {
    await signIn("nodemailer", {
      email,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirect: false,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "EmailSignInError":
          return { error: "Invalid Email" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};
