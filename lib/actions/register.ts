"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail, registerUser } from "./user.actions";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  registerUser(name, email);

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.identifier,
    verificationToken.token,
  );

  return { success: "Confirmation email sent!" };
};