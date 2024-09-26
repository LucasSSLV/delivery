import { mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";
// import crypto from "crypto";

const collectionName = "users";

//tras a lista de usuarios do banco de dados
export default class UsersDataAccess {
  async getUsers() {
    const result = await mongo.db.collection(collectionName).find({}).toArray();

    return result;
  }

  //trás usuário por id
  async getUserById(id) {
    const result = await mongo.db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(id) });

    return result;
  }

  //rota que deleta um usuário
  async deleteUserById(userId) {
    const result = await mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(userId) });

    return result;
  }
  async updateUser() {}
}
