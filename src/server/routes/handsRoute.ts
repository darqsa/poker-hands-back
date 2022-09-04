import express from "express";

const handsRouter = express.Router();

handsRouter.get("/", loadHands);

export default handsRouter;
