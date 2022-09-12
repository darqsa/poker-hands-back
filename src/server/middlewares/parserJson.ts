import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import createCustomError from "../../utils/createCustomError";

const parserJson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userHand } = req.body;
    const hand = await JSON.parse(userHand);

    if (req.file) {
      const newName = `${Date.now()}${req.file.originalname}`;

      await fs.rename(
        path.join("uploads", req.file.filename),
        path.join("uploads", newName)
      );

      hand.handImage = newName;
    }

    req.body = hand;

    next();
  } catch (error) {
    const errorData = createCustomError(400, "Missing data", "Missing data");
    next(errorData);
  }
};

export default parserJson;
