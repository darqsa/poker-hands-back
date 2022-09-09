import express from "express";
import { validate } from "express-validation";
import {
  createHand,
  deleteHand,
  loadHandById,
  loadHands,
} from "../controllers/handsController";
import handDataSchema from "../schemas/handDataSchema";

const handsRouter = express.Router();

handsRouter.get("/", loadHands);
handsRouter.get("/:handId", loadHandById);
handsRouter.post(
  "/create",
  validate(handDataSchema, {}, { abortEarly: false }),
  createHand
);
handsRouter.delete("/delete/:handId", deleteHand);

export default handsRouter;
