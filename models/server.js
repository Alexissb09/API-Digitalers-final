import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import { authRouter } from "../routes/auth.routes.js";
import { userRouter } from "../routes/user.routes.js";
import { roleRouter } from "../routes/role.routes.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.paths = {
      users: "/api/users",
      auth: "/api/auth",
      roles: "/api/roles",
    };

    // Quito el header que indica que la app esta hecha con express
    this.app.disable("x-powered-by");

    // Middlewares
    this.middlewares();

    // Conexion a la base de datos
    this.connectDB();

    // Rutas
    this.routes();

    // Arranca el servidor
    this.listen();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Parser
    this.app.use(express.json());

    // CORS
    this.app.use(cors());

    // Directorios publicos
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.users, userRouter);
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.roles, roleRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening on http://localhost:${this.port}`);
    });
  }
}
