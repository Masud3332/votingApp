import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  ParticipantsDelete,
  ParticipantsUpdate,
  Participantslogin,
  participantCreate,
} from "../controllers/participantsController.js";

export const participantsRouter = express();

participantsRouter.post("/participants-create", participantCreate);
participantsRouter.post("/Participants-login", verifyToken, Participantslogin);
participantsRouter.put("/participants/:id", ParticipantsUpdate);
participantsRouter.delete("/Participants-delete/:id", ParticipantsDelete);
