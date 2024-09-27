import { mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";
import crypto from "crypto";

const collectionName = "users";

//tras a lista de usuarios do banco de dados
export default class UsersDataAccess {
  //tras a lista de usuarios do banco de dados
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

  //rota que atualiza um usuário
  async updateUser(userId, dataUpdate) {
    if (dataUpdate.password) {
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        dataUpdate.password,
        salt,
        310000,
        16,
        "sha256",
        async (err, hashedPassword) => {
          if (err) {
            throw new Error("Error encrypting password!");
          }
          dataUpdate = { ...dataUpdate, password: hashedPassword, salt };

          const result = await mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
              { _id: new ObjectId(userId) },
              { $set: dataUpdate }
            );
          return result;
        }
      );
    } else {
      const result = await mongo.db
        .collection(collectionName)
        .findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: dataUpdate });
      return result;
    }
  }
}
