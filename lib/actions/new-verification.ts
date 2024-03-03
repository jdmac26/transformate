"use server";

import { deleteVerificationToken, getVerificationTokenByToken, verifyUser } from "@/lib/actions/verificiation-token.action";
import User from "../database/models/user.model";
import VerificationToken from "../database/models/verificationToken.model";
import { connectToDatabase } from "../database/mongoose";
import { getUserByEmail } from "./user.actions";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  console.log("New-Veri-existingToken: ", existingToken);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.identifier);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  console.log("Verifying User Email")
  verifyUser(existingUser._id, existingToken.identifier);

  console.log("Deleting Verification Token!!")
  deleteVerificationToken(existingToken._id);

  return { success: "Email verified!" };
};
