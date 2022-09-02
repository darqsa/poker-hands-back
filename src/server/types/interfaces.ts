import { Request } from "express";

export interface CustomError extends Error {
  statusCode: number;
  publicMessage: string;
  privateMessage: string;
}

export interface UserData {
  username: string;
  password: string;
}

export interface UserLoginData extends UserData {
  id: string;
}

export interface UserPayload {
  username: string;
  id: string;
}

export interface CustomRequest extends Request {
  payload: UserPayload;
}
