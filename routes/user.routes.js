import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { emailExist, userExist } from "../helpers/dbValidators.js";

import {
  getUser,
  getUsers,
  postUser,
  deleteUser,
  putUser,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get(
  "/:id",
  [
    validateJWT,
    check("id", "The ID is not valid").isMongoId(),
    check("id").custom(userExist),
    validateFields,
  ],
  getUser
);

userRouter.get("/", getUsers);

userRouter.put(
  "/:id",
  [
    check("id", "The ID is not valid").isMongoId(),
    check("id").custom(userExist),
    check("password", "The password must have more than 6 characters").isLength(
      { min: 6 }
    ),
    validateFields,
  ],
  putUser
);

userRouter.post(
  "/",
  [
    check("name", "The name is required").notEmpty(),
    check("password", "The password must have more than 6 characters").isLength(
      { min: 6 }
    ),
    check("email", "The email is not valid").isEmail().custom(emailExist),
    validateFields,
  ],
  postUser
);

userRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "The ID is not valid").isMongoId(),
    check("id").custom(userExist),
    validateFields,
  ],
  deleteUser
);
