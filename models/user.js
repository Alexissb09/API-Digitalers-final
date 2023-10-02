import { Schema, model } from "mongoose";

const UserSchema = Schema({
  name: { type: String, required: [true, "The name is required"] },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: { type: String, required: [true, "The password is required"] },
  status: { type: Boolean, default: true },
  role: {
    type: String,
    required: true,
    enum: ["USER_ROLE", "ADMIN_ROLE"],
    default: "USER_ROLE",
  },
});

// Quitamos la version y password
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject(); // El user a json y desestructuramos

  user.uid = _id;

  return user;
};

export const User = model("User", UserSchema);
