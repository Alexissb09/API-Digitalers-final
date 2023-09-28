import { User } from "../models/user.js";

// Validamos si el email existe buscandolo en la base de datos
export const emailExist = async (email = "") => {
  const emailFound = await User.findOne({ email });

  if (emailFound) {
    throw new Error(`The email ${email} is already registered`);
  }
};

// Validamos el usuario si existe en la base de datos
export const userExist = async (id) => {
  const userFound = await User.findById(id);

  if (!userFound) {
    throw new Error(`The id ${id} does not exist`);
  }
};
