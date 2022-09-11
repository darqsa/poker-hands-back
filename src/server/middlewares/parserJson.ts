import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import createCustomError from "../../utils/createCustomError";

const parserJson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newhand = req.body;

    const hand = await JSON.parse(newhand);

    const newName = `${Date.now()}${req.file.originalname}`;
    hand.postGame.handImage = newName;

    await fs.rename(
      path.join("uploads", req.file.filename),
      path.join("uploads", newName)
    );

    hand.postGame.handImage = newName;

    req.body = hand;

    next();
  } catch (error) {
    const errorData = createCustomError(404, "Missing data", "Missing data");
    next(errorData);
  }
};

export default parserJson;
