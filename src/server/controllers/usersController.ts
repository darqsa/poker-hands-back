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
      400,
      "Error creating user",
      error.message
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

  const userError = createCustomError(
    403,
    "Incorrect user or password",
    Error.name
  );
  const catchedError = createCustomError(
    403,
    "Invalid user or password",
    Error.name
  );

  try {
    findUser = await User.find({ username: user.username.toString() });
    if (findUser.length === 0) {
      next(userError);
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
      throw new Error();
    }
  } catch (error) {
    userError.message = "Password Invalid";
    next(userError);
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
