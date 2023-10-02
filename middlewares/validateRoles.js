// Verificamos si el usuario tiene rol ADMIN_ROLE
export const isAdminRole = (req, res, next) => {
  try {
    const userAuth = req.userAuth;

    if (!userAuth) {
      return res.status(500).json({
        message:
          "Trying to verify user's role without first validate the token",
      });
    }

    const { role, name } = userAuth;

    console.log(userAuth)

    console.log(role)
  
    if (role !== "ADMIN_ROLE") {
      return res
        .status(401)
        .json({ message: `${name} doesn't have permissions` });
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

// Podemos ingresarle los roles requeridos manualmente en un [] y verifica si el usuario autenticado los tiene
export const haveRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userAuth.role)) {
      return res.status(401).json({
        message: `The service require this roles: ${roles}`,
      });
    }
    next();
  };
};
