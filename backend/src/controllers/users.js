import UsersDataAccess from "../dataAccess/users";
import { ok, serverError } from "../helpers/httpResponse";

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
