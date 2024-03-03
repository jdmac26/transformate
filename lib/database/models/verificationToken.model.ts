import { ObjectId } from "mongodb";
import { Schema, model, models, now } from "mongoose";
import { unique } from "next/dist/build/utils";

const verificationTokenSchema = new Schema({
    _id: { 
        type: ObjectId,
        auto: true, 
    },
    identifier: { 
        type: String 
    },
    token: { 
        type: String, 
        unique: true 
    },
    expires: { 
        type: Date 
    }
});

// verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

const VerificationToken = models?.VerificationToken || model("VerificationToken", verificationTokenSchema);

export default VerificationToken;
