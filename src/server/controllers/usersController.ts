import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import createHash from "../../utils/auth";
import createCustomError from "../../utils/createCustomError";
import { UserData } from "../types/errorInterfaces";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserData = req.body;

  user.password = await createHash(user.password);
  try {
    const newUser = await User.create(user);
    res.status(201).json({ user: newUser });
  } catch (error) {
    const customError = createCustomError(
      400,
      "Error creating user",
      error.message
    );
    next(customError);
  }
};
export default registerUser;
