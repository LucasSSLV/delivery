import { mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "plates";

//tras a lista de pratos do banco de dados
export default class PlatesDataAccess {
  // //tras a lista de pratos do banco de dados
  async getPlates() {
    const result = await mongo.db.collection(collectionName).find({}).toArray();

    return result;
  }

  //verifica se o prato existe
  async getAvailiablePlates() {
    const result = await mongo.db.collection(collectionName).find({}).toArray();

    return result;
  }

  //adiciona um novo prato
  async addPlate(plateData) {
    const result = await mongo.db
      .collection(collectionName)
      .insertOne(plateData);
    return result;
  }
  //trás prato por id
  async getPlateById(id) {
    const result = await mongo.db
      .collection(collectionName)
      .findOne({ avaliable: true });

    return result;
  }

  //rota que deleta um prato
  async deletePlate(plateId) {
    const result = await mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(plateId) });

    return result;
  }

  //rota que atualiza um prato
  async updatePlate(PlateId, dataUpdate) {
    const result = await mongo.db
      .collection(collectionName)
      .findOneAndUpdate({ _id: new ObjectId(PlateId) }, { $set: dataUpdate });
    return result;
  }
}
