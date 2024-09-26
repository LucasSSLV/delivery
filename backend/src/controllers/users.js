import UsersDataAccess from "../dataAccess/users.js";
import { notFound, ok, serverError } from "../helpers/httpResponse.js";

export default class UsersController {
  constructor() {
    this.dataAccess = new UsersDataAccess();
  }
  // tras a lista de usuarios do banco de dados
  async getUsers() {
    try {
      const users = await this.dataAccess.getUsers();
      return ok(users);
    } catch (error) {
      return serverError(error);
    }
  }

  //trás usuário por id
  async getUserById(id) {
    try {
      const userById = await this.dataAccess.getUserById(id);
      if (userById) {
        return ok(userById);
      }
      return notFound();
    } catch (error) {
      return serverError(error);
    }
  }

  //deleta usuário por id
  async deleteUserById(userId) {
    try {
      const result = await this.dataAccess.deleteUserById(userId);

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
