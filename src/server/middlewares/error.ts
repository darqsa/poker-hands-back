import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/errorInterfaces";

const debug = Debug("poker-hands:server:middlewares:errors");

export const notFoundError = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorStatus = error.statusCode ?? 500;
  const publicErrorMessage = error.publicMessage ?? "General error";
  const privateErrorMessage = error.privateMessage;

  debug(chalk.red(privateErrorMessage));

  res.status(errorStatus).json({ error: publicErrorMessage });
};
