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

export interface HandData {
  handName: string;
  preGame: {
    hero: {
      position: number;
      initialStack: number;
      hand: string[];
    };
    villains: [
      {
        position: number;
        initialStack: number;
        hand: string[];
      }
    ];
  };
  game: {
    preFlop: {
      pot: number;
      actions: string[];
    };
    flop?: {
      board: string[];
      pot: number;
      actions: string[];
    };
    turn?: {
      board: string;
      pot: number;
      actions: string[];
    };
    river?: {
      board: string;
      pot: number;
      actions: string[];
    };
  };
  postGame: {
    finalPot: number;
    gameWinner: string;
    handDescription?: string;
    handImage?: string;
  };
  owner: string;
}
