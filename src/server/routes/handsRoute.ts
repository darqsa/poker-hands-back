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
import supaBaseUpload from "../middlewares/supabase";
import parserJson from "../middlewares/parserJson";

const upload = multer({ dest: "uploads", limits: { fileSize: 10000000 } });
const handsRouter = express.Router();

handsRouter.get("/", loadHands);
handsRouter.get("/:handId", loadHandById);
handsRouter.post(
  "/create",
  upload.single("handImage"),
  parserJson,
  validate(handDataSchema, {}, { abortEarly: false }),
  supaBaseUpload,
  createHand
);
handsRouter.delete("/delete/:handId", deleteHand);

export default handsRouter;
