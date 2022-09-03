import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import createCustomError from "../../utils/createCustomError";
import User from "../../database/models/User";
import { loginUser, registerUser } from "./usersController";

let mockHashCompareValue: boolean | jest.Mock = true;

jest.mock("../../utils/auth", () => ({
  ...jest.requireActual("../../utils/auth"),
  createToken: () => jest.fn().mockReturnValue("#"),
  createHash: () => "#",
  compareHash: () => mockHashCompareValue,
}));

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

describe("Given a loginUser function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const fakeUser = {
    username: "bobby",
    password: "thesponge",
  };

  const req: Partial<Request> = { body: fakeUser };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  User.find = jest.fn().mockReturnValue([fakeUser]);

  describe("When invoked with a request, response and next", () => {
    test("Then it should call status function with code 200", async () => {
      mockHashCompareValue = jest.fn().mockReturnValue(true);
      await loginUser(req as Request, res as Response, next as NextFunction);
      const status = 200;

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the json method of the response", async () => {
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalled();
    });

    test("Then it should call the next function with the created error", async () => {
      User.find = jest.fn().mockReturnValue([]);
      const error = createCustomError(
        403,
        "Incorrect user or password",
        "Error logging user in"
      );

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });

    test("It should call the next function with the created error if an user find throw an error", async () => {
      const error = createCustomError(
        403,
        "Incorrect user or password",
        "Error logging user in"
      );
      User.find = jest.fn().mockRejectedValue(new Error());

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then it should call the next function with the created error if the request body does not fulfill contract", async () => {
      const error = createCustomError(
        403,
        "Incorrect user or password",
        "Error logging user in"
      );
      await loginUser(req as Request, res as Response, next as NextFunction);

      fakeUser.username = "bob";
      fakeUser.password = "the";

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then it should call the next function with the created error if the passwords don't match", async () => {
      User.find = jest.fn().mockReturnValue([fakeUser]);
      mockHashCompareValue = false;

      const error = createCustomError(
        403,
        "Invalid user or password",
        "Password doesn't match with user's password"
      );
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
