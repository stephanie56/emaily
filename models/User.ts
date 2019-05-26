import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  id: string;
}

const UserSchema = new Schema({
  googleId: { type: String, required: true },
  id: { type: String, required: true }
});

mongoose.model<IUser>("user", UserSchema);
