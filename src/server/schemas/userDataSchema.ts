import { Joi } from "express-validation";

const userDataSchema = {
  body: Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
  }),
};
export default userDataSchema;
