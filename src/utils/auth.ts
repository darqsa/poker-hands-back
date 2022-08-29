import bcrypt from "bcryptjs";

const createHash = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};
export default createHash;
