import OrdersDataAccess from "../dataAccess/orders.js";
import { ok, serverError } from "../helpers/httpResponse.js";

export default class OrdersController {
  constructor() {
    this.dataAccess = new OrdersDataAccess();
  }

  //retorna a lista de orders
  async getOrders() {
    try {
      const orders = await this.dataAccess.getOrders();
      return ok(orders);
    } catch (error) {
      return serverError(error);
    }
  }

  //retorna a lista de orders por id do usuario
  async getOrdersByUserId(userId) {
    try {
      const ordersById = await this.dataAccess.getOrdersByUserId(userId);
      if (!ordersById) {
        return notFound();
      }
      return ok(ordersById);
    } catch (error) {
      return serverError(error);
    }
  }

  //retorna a lista de orders por id
  async getOrderById(orderId) {
    try {
      const order = await this.dataAccess.getOrderById(orderId);
      if (!order) {
        return notFound();
      }
      return ok(order);
    } catch (error) {
      return serverError(error);
    }
  }

  //adicina um novo order
  async addOrder(orderData) {
    try {
      const result = await this.dataAccess.addOrder(orderData);

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  //deleta order por id
  async deleteOrderById(orderId) {
    try {
      //verifica se o order existe antes de deletar
      const result = await this.dataAccess.deleteOrder(orderId);

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      //verifica se o order existe antes de atualizar
      const result = await this.dataAccess.updateOrder(orderId, orderData);

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
