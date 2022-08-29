import express from "express";

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);

export default usersRouter;
