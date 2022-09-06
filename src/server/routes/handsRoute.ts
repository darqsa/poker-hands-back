import express from "express";
import { createHand, loadHands } from "../controllers/handsController";

const handsRouter = express.Router();

handsRouter.get("/", loadHands);
handsRouter.post("/create", createHand);

export default handsRouter;
