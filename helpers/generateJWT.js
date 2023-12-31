import jwt from "jsonwebtoken";

export const generateJWT = (uid = "") => {
  // Solo guardamos el id en el payload
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("The token cannot be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
};
