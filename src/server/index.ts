import cors from "cors";
import express from "express";
import { validate } from "express-validation";
import morgan from "morgan";
import { generalError } from "./middlewares/error";
import usersRouter from "./routes/usersRoute";
import userDataSchema from "./schemas/userDataSchema";

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

app.use(
  "/users",
  validate(userDataSchema, {}, { abortEarly: false }),
  usersRouter
);

app.use(generalError);

export default app;
