import { request, response } from "express";
import { Role } from "../models/role.js";

export const getRoles = async (req, res = response) => {
  try {
    const roles = await Role.find();

    if (!roles) {
      return res.status(404).json({
        message: "No role found in database",
      });
    }
    return res.status(200).json(roles);
  } catch (err) {
    console.error(err, "Error in getRoles");
  }
};

export const getRole = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id);

    return res.status(200).json(role);
  } catch (err) {
    console.error(err, "Error in getRole");
  }
};

export const createRole = async (req = request, res = response) => {
  const { role } = req.body;

  try {
    const newRole = new Role({ role });

    await newRole.save();

    return res.status(200).json(newRole);
  } catch (err) {
    console.error(err, "Error in createRole");
  }
};

export const deleteRole = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const roleDeleted = await Role.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Role deleted",
      roleDeleted,
    });
  } catch (err) {
    console.error(err, "Error in deleteRole");
  }
};
