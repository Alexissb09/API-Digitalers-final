import { response, request } from "express"; // Solo para que vscode sepa que es el res y req
import bcryptjs from "bcryptjs";

import { User } from "../models/user.js";

// Retorna un usuario por id
export const getUser = async (req = request, res = response) => {
  const id = req.params.id;

  const user = await User.findById(id); // Existencia del usuario manejada por middleware

  return res.status(200).json({ user });
};

// Obtenemos los usuarios activos y podemos limitar la cantidad
export const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const queryStatus = { status: true };

  // Promise.all ejecuta al mismo tiempo, es mas eficiente en tiempo de respuesta que hacer un await detras de otro
  // Devolvemos primero la cantidad de documentos y luego el objeto de usuarios
  // Si uno tiene un error, caen los demas

  // Buscamos los usuarios activos
  const [total, users] = await Promise.all([
    User.countDocuments(queryStatus),
    User.find(queryStatus).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({ total, users });
};

// Creamos un nuevo usuario y lo guardamos en db
export const postUser = async (req, res = response) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });

  // Hash password
  const salt = bcryptjs.genSaltSync(); // 10
  user.password = bcryptjs.hashSync(password, salt);

  // Guardado en DB
  await user.save();

  res.json({ user });
};

// Modificamos un usuario, si modificamos la contraseña se re-hashea
export const putUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, email, ...rest } = req.body;

  if (password) {
    // Hash password
    const salt = bcryptjs.genSaltSync(); // 10
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({ updatedUser });
};

// Eliminamos un usuario logicamente pasando status = false
export const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  // Eliminacion logica
  const deletedUser = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.status(200).json({ deletedUser });
};
