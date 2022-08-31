import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "..";
import connectDatabase from "../../database/connectDB";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoURL = server.getUri();

  //  crear un user para el login
  //  User.create({fodskdf})
  await connectDatabase(mongoURL);
});
afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given the endpoint POST /users/register", () => {
  describe("When it receives a request with username 'bobby' and password 'thesponge'", () => {
    test("Then it should response with status 201 and the newUser data", async () => {
      const fakeUser = {
        username: "bobby",
        password: "thesponge",
      };
      const status = 201;

      const { body } = await request(app)
        .post("/users/register")
        .send(fakeUser)
        .expect(status);

      expect(body.username).toStrictEqual(fakeUser.username);
    });
  });
});
