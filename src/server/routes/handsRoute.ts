import express from "express";
import loadHands from "../controllers/handsController";

const handsRouter = express.Router();

handsRouter.get("/", loadHands);

export default handsRouter;
