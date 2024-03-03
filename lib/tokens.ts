import { v4 as uuidv4 } from "uuid";

import { getVerificationTokenByEmail } from "@/lib/actions/verificiation-token.action";
import VerificationToken from "./database/models/verificationToken.model";

export const generateVerificationToken = async (identifier: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(identifier);

  if (existingToken) {
    await VerificationToken.findByIdAndDelete( existingToken._id );
  }

  const verficationToken = await VerificationToken.create({
      identifier,
      token,
      expires,
  });
  
  return verficationToken;
};
