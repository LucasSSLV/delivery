import express from "express";
import UserControllers from "../controllers/users.js";

const usersRouter = express.Router();

const userscontrollers = new UserControllers();

usersRouter.get("/", async (req, res) => {
  const { success, statusCode, body } = await userscontrollers.getUsers();

  res.status(statusCode).json({ success, statusCode, body });
});

export default usersRouter;
