"use server";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

export async function getAccountByUserId(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ _id: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}
