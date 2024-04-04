import express from 'express';
import { createIdController, deleteIdController, updateIdController } from "../controllers/idController.js";



export const idRouter = express()


idRouter.post("/create-userId",createIdController)
idRouter.put("/update-userId/:userId",updateIdController)
idRouter.delete("/delete-userId/:userId",deleteIdController)