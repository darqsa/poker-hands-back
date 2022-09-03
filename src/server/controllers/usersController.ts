import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import { compareHash, createHash, createToken } from "../../utils/auth";
import createCustomError from "../../utils/createCustomError";
import { UserData, UserLoginData, UserPayload } from "../types/interfaces";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserData = req.body;

  user.password = await createHash(user.password);
  try {
    const newUser = await User.create({
      username: user.username.toString(),
      password: user.password.toString(),
    });
    res.status(201).json(newUser);
  } catch (error) {
    const customError = createCustomError(
      409,
      "User already exists",
      "User already exists"
    );
    next(customError);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body as UserData;
  let findUser: UserLoginData[];

  const catchedError = createCustomError(
    400,
    "Error logging user in",
    "Error logging user in"
  );

  try {
    findUser = await User.find({
      username: user.username.toString(),
    });
    if (findUser.length === 0) {
      const customError = createCustomError(
        403,
        "Invalid user or password",
        "Username doesn't exist"
      );

      next(customError);
      return;
    }
  } catch (error) {
    next(catchedError);
    return;
  }

  try {
    const isPassWordvalid = await compareHash(
      user.password,
      findUser[0].password
    );
    if (!isPassWordvalid) {
      const customError = createCustomError(
        403,
        "Invalid user or password",
        "Password doesn't match with user's password"
      );
      next(customError);
      return;
    }
  } catch (error) {
    next(catchedError);
    return;
  }

  const payload: UserPayload = {
    username: findUser[0].username,
    id: findUser[0].id,
  };

  const responseData = {
    token: createToken(payload),
  };

  res.status(200).json(responseData);
};
