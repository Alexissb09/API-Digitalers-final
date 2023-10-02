import { User } from "../models/user.js";
import { Role } from "../models/role.js";

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

// Validamos si un rol existe (antes de crearlo)
export const roleNotExist = async (role) => {
  const roleFound = await Role.findOne({ role });

  if (roleFound !== null) {
    throw new Error(`The role ${role} is already registered`);
  }
};

// Validamos que el rol exista para poder trabajar sobre el
export const roleExist = async (id) => {
  const roleFound = await Role.findById(id);

  if (!roleFound) {
    throw new Error(`The role ${role} does not exist`);
  }
};
