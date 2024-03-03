"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import VerificationToken from "../database/models/verificationToken.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

export async function getVerificationTokenByToken(
  token: string
) {
  try {
    await connectToDatabase();

    const verificationToken = await VerificationToken.findOne({
       token 
    });

   if (!verificationToken) throw new Error("Token not found");

    return JSON.parse(JSON.stringify(verificationToken));
  } catch (error) {
    handleError(error);
  }
}

export async function getVerificationTokenByEmail (
  identifier: string
){
  try {
    await connectToDatabase();

    const verificationToken = await VerificationToken.findOne({
       identifier
    });

   return JSON.parse(JSON.stringify(verificationToken));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function verifyUser(_id: string, email: string) {
  try {
    await connectToDatabase();

    const verifiedUser = await User.findOneAndUpdate({ _id },
      { email },
      { emailVerified: new Date()},
    );

    if (!verifiedUser) throw new Error("User verification failed");
    
    return JSON.parse(JSON.stringify(verifiedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteVerificationToken(_id: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    // const TokenToDelete = await VerificationToken.findOne({ _id });

    // if (!TokenToDelete) {
    //   throw new Error("Token not found");
    // }

    // Delete user
    const deletedToken = await VerificationToken.findByIdAndDelete(_id);
    revalidatePath("/");

    return deletedToken ? JSON.parse(JSON.stringify(deletedToken)) : null;
  } catch (error) {
    handleError(error);
  }
}
