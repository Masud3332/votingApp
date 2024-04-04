import mongoose from "mongoose";
const pPollSchema = new mongoose.Schema(
  {
    pName: {
      type: String,
      required: true,
    },
    pOrganization: {
      type: String,
      required: true,
    },
    pVote: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

export const pPollModel = mongoose.model("pPoll", pPollSchema);
// export default pPollIdModel
