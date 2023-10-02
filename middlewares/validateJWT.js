import jwt from "jsonwebtoken";
import { request, response } from "express";
import { User } from "../models/user.js";

export const validateJWT = async (req = request, res = response, next) => {
  // Bearer token
  let token = req.headers["authorization"];
  
  if (!token) {
    return res.status(401).json({ message: "No token in request" });
  }
  
  // token en limpio
  token = token.split(" ")[1];
  
  try {
    // Verificamos el token y obtenemos el id del usuario
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Buscamos el usuario en la base de datos
    const userAuth = await User.findById(uid);

    if (!userAuth) {
      return res.status(401).json({
        message: "Invalid token - User not found in DB",
      });
    }

    // Verificamos si el usuario esta activo en la base de datos
    if (!userAuth.status) {
      return res.status(401).json({
        message: "Invalid token - User deleted",
      });
    }

    // Agregamos en la request los datos del usuario autenticado
    req.userAuth = userAuth;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
