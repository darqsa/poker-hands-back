import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  robots: [{ type: Schema.Types.ObjectId, ref: "Robot" }],
});

const User = model("User", userSchema, "users");

export default User;
