import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import { CustomError } from "../types/interfaces";

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
  let publicErrorMessage = error.publicMessage ?? "General error";
  let privateErrorMessage = error.privateMessage;

  if (error instanceof ValidationError) {
    publicErrorMessage = "Wrong data";
    privateErrorMessage = "Request validation error: ";

    error.details.body.forEach((errorInfo) => {
      privateErrorMessage += `${errorInfo.message}, `;
    });
  }

  debug(chalk.red(privateErrorMessage));

  res.status(errorStatus).json({ error: publicErrorMessage });
};
