import express from "express";
import UserControllers from "../controllers/users.js";

const usersRouter = express.Router();

const userscontrollers = new UserControllers();
//rota que trás a lista de usuarios do banco de dados
usersRouter.get("/", async (req, res) => {
  const { success, statusCode, body } = await userscontrollers.getUsers();

  res.status(statusCode).json({ success, statusCode, body });
});

//rota que trás um usuário por id
usersRouter.get("/:id", async (req, res) => {
  const { success, statusCode, body } = await userscontrollers.getUserById(
    req.params.id
  );

  res.status(statusCode).json({ success, statusCode, body });
});

//rota que deleta por id
usersRouter.delete("/:id", async (req, res) => {
  const { success, statusCode, body } = await userscontrollers.deleteUserById(
    req.params.id
  );

  res.status(statusCode).json({ success, statusCode, body });
});

//rota que atualiza por id
usersRouter.put("/:id", async (req, res) => {
  const { success, statusCode, body } = await userscontrollers.updateUser(
    req.params.id,
    req.body
  );

  res.status(statusCode).json({ success, statusCode, body });
});
export default usersRouter;
