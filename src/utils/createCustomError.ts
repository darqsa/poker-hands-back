import { CustomError } from "../server/types/interfaces";

const createCustomError = (
  code: number,
  publicMessage: string,
  privateMessage: string
) => {
  const error = new Error() as CustomError;

  error.statusCode = code;
  error.publicMessage = publicMessage;
  error.privateMessage = privateMessage;

  return error;
};
export default createCustomError;
