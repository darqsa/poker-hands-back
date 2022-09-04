import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "..";
import connectDatabase from "../../database/connectDB";
import Hand from "../../database/models/Hand";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoURL = server.getUri();

  await connectDatabase(mongoURL);
});
afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given the endpoint GET /hands", () => {
  describe("When it receives a request", () => {
    test("Then it should response with status 200 and an array with a fakeHand", async () => {
      const fakeHand = {};
      const status = 200;
      await Hand.create(fakeHand);

      const res = await request(app).get("/hands");

      expect(res.statusCode).toStrictEqual(status);
    });
  });
});
