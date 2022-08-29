import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/errorInterfaces";
import { generalError, notFoundError } from "./error";

describe("Given a notFoundError function", () => {
  describe("When receives a response object", () => {
    const req = {} as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    test("Then it should call the response method with 404", () => {
      const status = 404;

      notFoundError(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the response json method with the message 'Endpoint not found'", () => {
      const testError = { error: "Endpoint not found" };

      notFoundError(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(testError);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When receives a response object", () => {
    describe("And receives an error that has 222 as errorStatus and 'pete error' as publicErrorMessage", () => {
      const req = {} as Partial<Request>;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const next = () => {};

      test("Then it should call the response method with 222", () => {
        const status = 222;

        const error = new Error() as CustomError;
        error.statusCode = status;
        error.publicMessage = "";

        generalError(
          error as CustomError,
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(status);
      });

      test("Then it should call the response json method with 'pete error'", () => {
        const message = "pete error";

        const error = new Error() as CustomError;
        error.statusCode = 1;
        error.publicMessage = message;

        const testError = { error: message };

        generalError(
          error as CustomError,
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.json).toHaveBeenCalledWith(testError);
      });
    });
  });
});
