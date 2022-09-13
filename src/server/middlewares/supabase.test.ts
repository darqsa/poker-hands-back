import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import supaBaseUpload from "./supabase";

let mockUpload = jest.fn().mockReturnValue({
  error: false,
});

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    storage: {
      from: () => ({
        upload: mockUpload,
        getPublicUrl: () => ({
          publicURL: "Image url",
        }),
      }),
    },
  }),
}));

describe("Given a supabaseUpload function", () => {
  const res = {} as Partial<Response>;
  const next = jest.fn() as NextFunction;

  describe("When called without an image", () => {
    test("Then it should call the next function", async () => {
      const req = {
        body: {
          handImage: "",
        },
      } as Partial<Request>;

      await supaBaseUpload(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });

  const req = {
    body: {
      handImage: "image.png",
    },
  } as Partial<Request>;
  beforeAll(async () => {
    await fs.writeFile("uploads/image.png", "content");
  });

  afterAll(async () => {
    await fs.unlink("uploads/image.png");
  });

  describe("When called with a request, a response and a next function as arguments", () => {
    test("Then it should call next function", async () => {
      await supaBaseUpload(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });

    test("Then it should upload a file to supabase", async () => {
      await supaBaseUpload(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(mockUpload).toHaveBeenCalled();
    });

    test("If the upload fails, it should call next with an error", async () => {
      mockUpload = jest.fn().mockReturnValue({
        error: true,
      });

      await supaBaseUpload(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });

    test("Then it should set the image url at the body request", async () => {
      await supaBaseUpload(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(req.body.handImageBackup).toBe("Image url");
    });

    test("If an error occurs during the process, it should call next with an error", async () => {
      jest.clearAllMocks();
      mockUpload = jest.fn().mockRejectedValue(new Error());

      await supaBaseUpload(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });
});
