import { NextFunction, Request, Response } from "express";
import Hand from "../../database/models/Hand";
import createCustomError from "../../utils/createCustomError";
import loadHands from "./handsController";

describe("Given a loadHands function", () => {
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  describe("When it receives a response", () => {
    test("Then it should call status function with code 200", async () => {
      const expectedStatus = 200;
      Hand.find = jest.fn().mockResolvedValue([]);

      await loadHands(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    describe("And Hands.find() returns a list with Hola and Adios", () => {
      test("Then it should call the json method with the list with Hola and Adios", async () => {
        const hands = ["Hola", "Adios"];

        Hand.find = jest.fn().mockResolvedValue(hands);

        await loadHands(req as Request, res as Response, next as NextFunction);

        expect(res.json).toHaveBeenCalledWith({ hands });
      });
    });
  });

  describe("When it receives a response and a there is a new Error", () => {
    test("Then it should call the next function with the error", async () => {
      const customError = createCustomError(400, "", "");
      Hand.find = jest.fn().mockRejectedValue(customError);

      await loadHands(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
