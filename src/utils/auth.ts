import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserPayload } from "../server/types/interfaces";

export const createHash = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};

export const compareHash = (text: string, hash: string) =>
  bcrypt.compare(text, hash);

export const createToken = (payload: UserPayload) =>
  jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);
