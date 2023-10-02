import { Router } from "express";
import { check } from "express-validator";
import { roleExist, roleNotExist } from "../helpers/dbValidators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { isAdminRole } from "../middlewares/validateRoles.js";

import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
} from "../controllers/role.controller.js";
import { validateJWT } from "../middlewares/validateJWT.js";

export const roleRouter = Router();

roleRouter.get("/", getRoles);

roleRouter.get(
  "/:id",
  [
    check("id", "The ID is not valid").isMongoId(),
    check("id").custom(roleExist),
    validateFields,
  ],
  getRole
);

roleRouter.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    check("role", "The role is required").notEmpty(),
    check("role").custom(roleNotExist),
    validateFields,
  ],
  createRole
);

roleRouter.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "The ID is not valid").isMongoId(),
    check("id").custom(roleExist),
    validateFields,
  ],
  deleteRole
);
