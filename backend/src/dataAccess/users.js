import { mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";
import crypto from "crypto";

const collectionName = "users";

export default class UsersDataAccess {
  async getUsers() {
    const result = await mongo.db.collection(collectionName).find({}).toArray();

    return result;
  }
  async deleteUser() {}
  async updateUser() {}
}
