import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createVoterController,
  deleteVoterController,
  loginVoterController,
  updateVoterController,
} from "../controllers/voterController.js";

export const voterRouter = express();

voterRouter.post("/create-voterId", createVoterController);
voterRouter.post("/login-voter", verifyToken, loginVoterController);
voterRouter.put("/updateVoter/:id", updateVoterController);
voterRouter.delete("/delete/:voterId", deleteVoterController);
