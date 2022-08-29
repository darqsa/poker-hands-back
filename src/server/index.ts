import cors from "cors";
import express from "express";
import morgan from "morgan";
import usersRouter from "./routes/usersRoute";

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

export default app;
