import UsersDataAccess from "../dataAccess/users.js";
import { notFound, ok, serverError } from "../helpers/httpResponse.js";

export default class UsersController {
  constructor() {
    this.dataAccess = new UsersDataAccess();
  }

  async getUsers() {
    try {
      const users = await this.dataAccess.getUsers();
      return ok(users);
    } catch (error) {
      return serverError(error);
    }
  }
}
