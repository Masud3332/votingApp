import mongoose from "mongoose";

const voterSchema = new mongoose.Schema(
  {
    voterId: {
      type: String,
      required: true,
      unique: true,
    },
    voterName: {
      type: String,
      required: true,
    },
    DateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const voterModel = mongoose.model("Voter", voterSchema);
// export default voterModel
