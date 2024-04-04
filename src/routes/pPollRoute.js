import express from "express";
import {
  getParticipantsForVoting,
  getVoteCount,
  voteParticipant,
} from "../controllers/pPollController.js";

export const pPollRouter = express();

pPollRouter.get("/participants", getParticipantsForVoting);
pPollRouter.post("/voteParticipant", voteParticipant);
pPollRouter.get("/vote-count", getVoteCount);
