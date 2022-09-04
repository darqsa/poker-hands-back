import { NextFunction, Request, Response } from "express";
import Hand from "../../database/models/Hand";
import createCustomError from "../../utils/createCustomError";

const loadHands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hands = await Hand.find();

    res.status(200).json({ hands });
  } catch (error) {
    const customError = createCustomError(
      400,
      "Could not get hands",
      "Could not get hands"
    );
    next(customError);
  }
};
export default loadHands;
