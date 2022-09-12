import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import fakeHand from "../../test-utils/mockHand";
import createCustomError from "../../utils/createCustomError";
import parserJson from "./parserJson";

jest.useFakeTimers();

describe("Given a parseData middleware", () => {
  describe("When it receive a request, a response and a next function", () => {
    const handJson = JSON.stringify(fakeHand);

    jest
      .spyOn(path, "join")
      .mockReturnValue(`${path.join("uploads", "image")}`);

    jest.spyOn(fs, "rename").mockResolvedValue();

    const req = {
      body: { userHand: handJson },
      file: { filename: "hola123", originalname: "hola123" },
    } as Partial<Request>;

    const res = {} as Partial<Response>;

    const next = jest.fn() as NextFunction;

    test("Then it should asign the data as req body", async () => {
      await parserJson(req as Request, res as Response, next);

      expect(req.body).toStrictEqual({
        ...fakeHand,
        handImage: `${Date.now()}${req.file.filename}`,
      });
      expect(next).toHaveBeenCalled();
    });

    test("If it get an error it must call the next function with the error created", async () => {
      const reqWithoutImage = {
        body: { userHand: fakeHand },
      } as Partial<Request>;

      const newError = createCustomError(400, "Missing data", "Missing data");
      await parserJson(reqWithoutImage as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});
