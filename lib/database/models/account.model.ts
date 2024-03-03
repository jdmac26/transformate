import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

const accountSchema = new Schema({
  _id: { type: ObjectId, auto: true },
  userId: { type: ObjectId, ref: 'User' },
  type: { type: String },
  provider: { type: String },
  providerAccountId: { type: String },
  refresh_token: { type: String },
  access_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String },
  session_state: { type: String }
});

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = models?.Account || model('Account', accountSchema);

export default Account;