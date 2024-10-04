import express from "express";
import OrdersController from "../controllers/orders.js";
const orderRouter = express.Router();

const ordersController = new OrdersController();

//rota que deleta por id
orderRouter.delete("/:id", async (req, res) => {
  const { success, statusCode, body } = await ordersController.deleteOrderById(
    req.params.id
  );

  res.status(statusCode).json({ success, statusCode, body });
});
//rota que trás a lista de order do banco de dados
orderRouter.get("/", async (req, res) => {
  const { success, statusCode, body } = await ordersController.getOrders();

  res.status(statusCode).json({ success, statusCode, body });
});

//rota que trás a lista de order por id do usuario
orderRouter.get("/:id", async (req, res) => {
  const { success, statusCode, body } =
    await ordersController.getOrdersByUserId(req.params.id);

  res.status(statusCode).json({ success, statusCode, body });
});
//rota que adiciona uma nova order
orderRouter.post("/", async (req, res) => {
  const { success, statusCode, body } = await ordersController.addOrder(
    req.body
  );

  res.status(statusCode).json({
    statusCode,
    success,
    body,
  });
});
export default orderRouter;
