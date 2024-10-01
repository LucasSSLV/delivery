import OrdersDataAccess from "../dataAccess/orders.js";
import {
  ok,
  serverError,
} from "../helpers/httpResponse.js";

export default class OrdersController {
  constructor() {
    this.dataAccess = new OrdersDataAccess();
  }

  async getOrders() {
    try {
      const orders = await this.dataAccess.getOrders();
      return ok(orders);
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
}
