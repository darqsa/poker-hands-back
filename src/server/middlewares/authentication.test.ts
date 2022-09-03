import { NextFunction, Response } from "express";
import createCustomError from "../../utils/createCustomError";
import { CustomRequest } from "../types/interfaces";
import authentication from "./authentication";

const mockTokenVerify = jest.fn();

jest.mock("../../utils/auth", () => ({
  ...jest.requireActual("../../utils/auth"),
  verifyToken: () => mockTokenVerify,
}));

describe("Given an authentication middleware", () => {
  describe("When invoke with req, res and next", () => {
    test("Then it should call the next function with tokenData as request payload", () => {
      const req = {
        get: jest.fn().mockReturnValue("Bearer #"),
      } as Partial<CustomRequest>;

      const res = {} as Partial<Response>;

      const next = jest.fn() as NextFunction;
      const error = createCustomError(
        400,
        "Authentication error",
        "Authentication error"
      );

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalledWith(error);
    });

    describe("And there is no Authorization header at request", () => {
      test("Then it should call the next function with an error", () => {
        const req = {
          get: jest.fn().mockReturnValue(""),
        } as Partial<CustomRequest>;

        const res = {} as Partial<Response>;

        const next = jest.fn() as NextFunction;
        const error = createCustomError(
          400,
          "Authentication error",
          "Authentication error"
        );

        authentication(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(error);
      });
    });

    describe("And the Authorization header at request doesn't start with 'Bearer '", () => {
      test("Then it should call the next function with an error", () => {
        const req = {
          get: jest.fn().mockReturnValue("Osador "),
        } as Partial<CustomRequest>;

        const res = {} as Partial<Response>;

        const next = jest.fn() as NextFunction;
        const error = createCustomError(
          400,
          "Authentication error",
          "Authentication error"
        );

        authentication(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
