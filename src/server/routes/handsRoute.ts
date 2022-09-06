import express from "express";
import { validate } from "express-validation";
import { createHand, loadHands } from "../controllers/handsController";
import handDataSchema from "../schemas/handDataSchema";

const handsRouter = express.Router();

handsRouter.get("/", loadHands);
handsRouter.post(
  "/create",
  validate(handDataSchema, {}, { abortEarly: false }),
  createHand
);

export default handsRouter;
