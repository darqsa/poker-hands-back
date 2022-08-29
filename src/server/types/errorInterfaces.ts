export interface CustomError extends Error {
  statusCode: number;
  publicMessage: string;
  privateMessage: string;
}

export interface UserData {
  username: string;
  password: string;
}
