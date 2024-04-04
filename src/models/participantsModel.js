import mongoose from "mongoose";
const participantsSchema = new mongoose.Schema(
  {
    pId: {
      type: String,
      required: true,
      unique: true,
    },
    pName: {
      type: String,
      required: true,
    },
    pPassword: {
      type: String,
      required: true,
    },
    pOrganization: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const participantsModel = mongoose.model(
  "Participant",
  participantsSchema
);
// export default participantsModel
