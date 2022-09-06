import { NextFunction, Request, Response } from "express";
import Hand from "../../database/models/Hand";
import createCustomError from "../../utils/createCustomError";
import { HandData } from "../types/interfaces";
import { createHand, loadHands } from "./handsController";

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

describe("Given a createHand function", () => {
  const fakeHand: HandData = {
    handName: "Best hand name ever",
    preGame: {
      hero: { hand: ["Ac", "Ad"], initialStack: 100, position: 0 },
      villains: [{ hand: ["Ah", "As"], initialStack: 100, position: 1 }],
    },
    game: {
      preFlop: { actions: ["Everyone is allin"], pot: 200 },
      flop: {
        board: ["Ts", "9c", "8h"],
        actions: ["Everyone is allin"],
        pot: 200,
      },
      turn: { board: "7d", actions: ["Everyone is allin"], pot: 200 },
      river: { board: "6d", actions: ["Everyone is allin"], pot: 200 },
    },
    postGame: { finalPot: 200, gameWinner: "Hero" },
  };

  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  describe("When it receives a response and a fake hand", () => {
    test("Then it should call status function with code 201", async () => {
      const expectedStatus = 201;

      Hand.create = jest.fn().mockResolvedValue(fakeHand);
      await createHand(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response method with the text", async () => {
      Hand.create = jest.fn().mockResolvedValue(fakeHand);
      const text = "Hand created successfully";

      await createHand(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(text);
    });
  });

  describe("When it receives a response and a wrong fakeHand", () => {
    test("Then it should call next function with the fakeCustomError", async () => {
      const fakeCustomError = createCustomError(
        400,
        "Error creating new hand",
        "Error creating new hand"
      );
      Hand.create = jest.fn().mockRejectedValue(fakeCustomError);
      await createHand(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(fakeCustomError);
    });
  });
});
