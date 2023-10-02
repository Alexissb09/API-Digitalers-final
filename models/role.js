import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, "The role is required"],
    unique: true, // Solo van a existir los roles indicados en el enum
  },
});

export const Role = model("Role", RoleSchema);
