import express from "express";
import PlatesController from "../controllers/plates.js";

const platesRouter = express.Router();
const platesControllers = new PlatesController();


// 1. Rota específica que traz pratos disponíveis
platesRouter.get("/availiable", async (req, res) => {
  const { success, statusCode, body } =
  await platesControllers.getAvailiablePlates();
  
  res.status(statusCode).json({ success, statusCode, body });
});
// 2. Rota geral que traz a lista de pratos do banco de dados
platesRouter.get("/", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.getAllPlates();
  res.status(statusCode).json({ success, statusCode, body });
});

// 3. Rota que adiciona um novo prato
platesRouter.post("/", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.addPlate(
    req.body
  );
  res.status(statusCode).json({ success, statusCode, body });
});

// 4. Rota que atualiza um prato por ID
platesRouter.put("/:id", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.updatePlate(
    req.params.id,
    req.body
  );
  res.status(statusCode).json({ success, statusCode, body });
});

// 5. Rota que deleta um prato por ID
platesRouter.delete("/:id", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.deletePlateById(
    req.params.id
  );
  res.status(statusCode).json({ success, statusCode, body });
});

export default platesRouter;
