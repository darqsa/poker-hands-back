import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import createCustomError from "../../utils/createCustomError";
import User from "../../database/models/User";
import registerUser from "./usersController";

describe("Given a registerUser function", () => {
  const fakeUser = {
    username: "bob esponja",
    password: "test",
  };

  const req: Partial<Request> = { body: fakeUser };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();
  describe("When it receives a response and a fake user", () => {
    const bcryptHashTest = jest.fn().mockResolvedValue("test");
    (bcrypt.hash as jest.Mock) = bcryptHashTest;

    test("Then it should call status function with code 201", async () => {
      const expectedStatus = 201;
      User.create = jest.fn().mockResolvedValue(fakeUser);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should invoke the response method json with a new User", async () => {
      User.create = jest.fn().mockResolvedValue(fakeUser);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith({
        username: fakeUser.username.toString(),
        password: fakeUser.password.toString(),
      });
    });
  });

  describe("When it receives a response and a wrong fake user", () => {
    test("Then it should call the next function and throw a customError", async () => {
      const customError = createCustomError(400, "", "");
      User.create = jest.fn().mockRejectedValue(customError);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
