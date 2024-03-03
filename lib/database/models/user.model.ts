import { ObjectId } from "mongodb";
import { Schema, model, models, now } from "mongoose";

const UserSchema = new Schema({
  _id: {
    type: ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: {
    type: Date,
  },
  image: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    updatedAt: true,
  },
  accounts: [{
    type: ObjectId,
    ref: 'Account',
  }]
});

const User = models?.User || model("User", UserSchema);

export default User;