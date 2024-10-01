import { mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "orders";

//tras a lista de pratos do banco de dados
export default class OrdersDataAccess {
  // //tras a lista de pratos do banco de dados
  async getOrders() {
    const result = await mongo.db.collection(collectionName).aggregate([
      {
        $lookup: {
          from: "orderItems",
          localField: "_id",
          foreignField: "orderId",
          as: "orderItems",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $project: {
          "userDetails.password": 0,
          "userDetails.salt": 0,
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $lookup: {
          from: "plates",
          localField: "orderItems.plateId",
          foreignField: "_id",
          as: "orderItems.itemDetails",
        },
      },
      {
        $group: {
          _id: "$_id",
          userDetails: { $first: "$userDetails" },
          orderItems: { $push: "$orderItems" },
          pickupStatus: { $first: "$pickupStatus" },
          pickupTime: { $first: "$pickupTime" },
        },
      },
    ]).toArray();

    return result;
  }

  //adiciona um novo prato
  async addOrder(orderData) {
    const { itens, ...orderDataRest } = orderData;
    //cria um novo prato
    orderDataRest.createAt = new Date();
    orderDataRest.pickuStatus = "pending";
    orderDataRest.userdId = new ObjectId(orderDataRest.userId);
    //insere o prato no banco de dados
    const newOrder = await mongo.db
      .collection(collectionName)
      .insertOne(orderDataRest);
    //se não conseguir inserir o prato, retorna um erro
    if (!newOrder.insertedId) {
      throw new Error("Cannot insert order");
    }

    itens.map((item) => {
      item.plateId = new ObjectId(item.plateId);
      item.orderId = new ObjectId(newOrder.insertedId);
    });

    const result = await mongo.db.collection("orderItems").insertMany(itens);
    return result;
  }

  //rota que deleta um prato
  async deleteOrder(orderId) {
    const result = await mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(orderId) });

    return result;
  }
}
