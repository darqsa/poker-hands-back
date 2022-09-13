import express from "express";
import multer from "multer";
import { validate } from "express-validation";
import {
  createHand,
  deleteHand,
  editHand,
  loadByHandName,
  loadHandById,
  loadHands,
} from "../controllers/handsController";
import handDataSchema from "../schemas/handDataSchema";
import supaBaseUpload from "../middlewares/supabase";
import parserJson from "../middlewares/parserJson";
import authentication from "../middlewares/authentication";

const upload = multer({ dest: "uploads", limits: { fileSize: 1000000 } });
const handsRouter = express.Router();

handsRouter.get("/", authentication, loadHands);
handsRouter.get("/:hand", authentication, loadByHandName);
handsRouter.get("/:handId", loadHandById);
handsRouter.post(
  "/create",
  upload.single("handImage"),
  authentication,
  parserJson,
  validate(handDataSchema, {}, { abortEarly: false }),
  supaBaseUpload,
  createHand
);
handsRouter.put(
  "/edit/:handId",
  upload.single("handImage"),
  authentication,
  parserJson,
  validate(handDataSchema, {}, { abortEarly: false }),
  supaBaseUpload,
  editHand
);
handsRouter.delete("/delete/:handId", authentication, deleteHand);

export default handsRouter;
