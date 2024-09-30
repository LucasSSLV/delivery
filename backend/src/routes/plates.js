import express from "express";
import PlatesController from "../controllers/plates.js";
import { dadosIncompletos } from "../helpers/httpResponse.js";
const platesRouter = express.Router();

const platesControllers = new PlatesController();

//rota que trás a lista de prato do banco de dados
platesRouter.get("/", async (req, res) => {
  const { success, statusCode, body } =
    await platesControllers.getAvailiablePlates();

  res.status(statusCode).json({ success, statusCode, body });
});

//rota que trás um prato por id
platesRouter.get("/availiable", async (req, res) => {
  const { success, statusCode, body } =
    await platesControllers.getAvailiablePlates();

  res.status(statusCode).json({ success, statusCode, body });
});

//rota que deleta por id
platesRouter.delete("/:id", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.deletePlateById(
    req.params.id
  );

  res.status(statusCode).json({ success, statusCode, body });
});

//rota que atualiza por id
platesRouter.put("/:id", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.updatePlate(
    req.params.id,
    req.body
  );

  res.status(statusCode).json({ success, statusCode, body });
});

//rota que adiciona um novo prato
platesRouter.post("/", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.addPlate(
    req.body
  );
  
  res.status(statusCode).json({
    statusCode,
    success,
    body,
  });
});
export default platesRouter;
