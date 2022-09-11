import express from "express";
import multer from "multer";
import { validate } from "express-validation";
import {
  createHand,
  deleteHand,
  loadHandById,
  loadHands,
} from "../controllers/handsController";
import handDataSchema from "../schemas/handDataSchema";

const upload = multer({ dest: "uploads", limits: { fileSize: 3000000 } });
const handsRouter = express.Router();

handsRouter.get("/", loadHands);
handsRouter.get("/:handId", loadHandById);
handsRouter.post(
  "/create",
  upload.single("image"),
  validate(handDataSchema, {}, { abortEarly: false }),
  createHand
);
handsRouter.delete("/delete/:handId", deleteHand);

export default handsRouter;
