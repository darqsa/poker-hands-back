import { NextFunction, Request, Response } from "express";
import Hand from "../../database/models/Hand";
import User from "../../database/models/User";
import fakeHand from "../../test-utils/mockHand";
import createCustomError from "../../utils/createCustomError";
import { CustomRequest } from "../types/interfaces";
import {
  createHand,
  deleteHand,
  editHand,
  loadHandById,
  loadHands,
} from "./handsController";

const fakeUser = {
  username: "FakeUser",
  id: "1234",
  hands: ["12345"],
};

describe("Given a loadHands function", () => {
  const req: Partial<CustomRequest> = {
    payload: { id: "1234", username: "test" },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  describe("When it receives a response", () => {
    test("Then it should call status function with code 200", async () => {
      const expectedStatus = 200;
      Hand.find = jest.fn().mockResolvedValue([]);
      User.findById = jest.fn().mockResolvedValue(fakeUser);
      await loadHands(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    describe("And Hands.find() returns a list with Hola and Adios", () => {
      test("Then it should call the json method with the list with Hola and Adios", async () => {
        const userHands = ["Hola", "Adios"];

        Hand.find = jest.fn().mockResolvedValue(userHands);
        User.findById = jest.fn().mockResolvedValue(fakeUser);

        await loadHands(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(res.json).toHaveBeenCalledWith({ userHands });
      });
    });
  });

  describe("When it receives a response and a there is a new Error", () => {
    test("Then it should call the next function with the error", async () => {
      const customError = createCustomError(400, "", "");
      Hand.find = jest.fn().mockRejectedValue(customError);
      User.findById = jest.fn().mockResolvedValue(fakeUser);

      await loadHands(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a createHand function", () => {
  const req: Partial<Request> = { body: fakeHand };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  Hand.create = jest.fn().mockReturnValue(fakeHand);
  User.findById = jest
    .fn()
    .mockReturnValue({ id: fakeUser.id, hands: fakeUser.hands });
  User.findByIdAndUpdate = jest.fn();
  describe("When it receives a response and a fake hand", () => {
    test("Then it should call status function with code 201", async () => {
      const expectedStatus = 201;
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

describe("Given a editHand function", () => {
  const newFakeHand = { ...fakeHand, handName: "New Hand Name" };
  const req: Partial<Request> = {
    body: newFakeHand,
    params: { handId: "1234" },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  Hand.replaceOne = jest.fn().mockReturnValue(newFakeHand);
  describe("When it receives a response and a new fake hand", () => {
    test("Then it should call status function with code 201", async () => {
      const expectedStatus = 201;
      await editHand(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response method with the text", async () => {
      const text = "Hand edited successfully";

      await editHand(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(text);
    });
  });

  describe("When it receives a response and a wrong new fakeHand", () => {
    test("Then it should call next function with the fakeCustomError", async () => {
      const fakeCustomError = createCustomError(
        400,
        "Error editing new hand",
        "Error editing new hand"
      );
      Hand.replaceOne = jest.fn().mockRejectedValue(fakeCustomError);
      await editHand(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(fakeCustomError);
    });
  });
});

describe("Given a deleteHand function", () => {
  const req: Partial<Request> = { params: { handId: "1234" } };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  describe("When it receives a valid id", () => {
    test("Then it should call status function with code 201", async () => {
      const expectedStatus = 201;
      Hand.findByIdAndDelete = jest.fn().mockReturnValue(fakeUser.hands[0]);
      User.findById = jest.fn().mockReturnValue(fakeUser);
      User.findByIdAndUpdate = jest.fn();
      await deleteHand(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the json method with a text", async () => {
      const text = "Hand deleted successfully";
      Hand.findByIdAndDelete = jest.fn();

      await deleteHand(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(text);
    });
  });

  describe("When it receives an invalid id", () => {
    test("Then it should call the next function with a custom error", async () => {
      const customError = createCustomError(
        400,
        "Error deleting Hand",
        "Error deleting  Hand"
      );

      Hand.findByIdAndDelete = jest.fn().mockRejectedValue(customError);

      await deleteHand(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a find hand by id function", () => {
  const req: Partial<Request> = { params: { handId: "1234" } };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  describe("When it receives a valid id", () => {
    test("Then it should call status function with code 201", async () => {
      const expectedStatus = 201;
      Hand.findById = jest.fn();

      await loadHandById(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the json method with the fakeHand", async () => {
      Hand.findById = jest.fn();

      await loadHandById(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives an invalid id", () => {
    test("Then it should call the next function with a custom error", async () => {
      const customError = createCustomError(
        400,
        "Couldn't find hand",
        "Couldn't find hand"
      );

      Hand.findById = jest.fn().mockRejectedValue(customError);

      await loadHandById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
