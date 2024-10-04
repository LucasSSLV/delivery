import { mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "orders";

//tras a lista de pratos do banco de dados
export default class OrdersDataAccess {
  // //tras a lista de pratos do banco de dados
  async getOrders() {
    const result = await mongo.db
      .collection(collectionName)
      .aggregate([
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
      ])
      .toArray();

    return result;
  }

  //pegar os pedidos de um usuário
  async getOrdersByUserId(userId) {
    try {
      // Validação básica do formato de userId
      if (!ObjectId.isValid(userId)) {
        throw new Error("Invalid userId format");
      }

      const result = await mongo.db
        .collection(collectionName)
        .aggregate([
          {
            $match: { userId: new ObjectId(userId) },
          },
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
          // {
          //   $unwind: "$userDetails",
          // },
          // {
          //   $project: {
          //     "userDetails.password": 0,
          //     "userDetails.salt": 0,
          //   },
          // },
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
            $unwind: {
              path: "$orderItems.itemDetails",
              preserveNullAndEmptyArrays: true, // Mantém o orderItem mesmo se não houver itemDetails
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
        ])
        .toArray();

      console.log(`Total de pedidos encontrados: ${result.length}`);
      return result;
    } catch (error) {
      console.error("Erro ao obter pedidos por userId:", error.message);
      // Dependendo da sua lógica de negócio, você pode optar por lançar o erro ou retornar uma resposta padrão
      throw error; // Ou return null;
    }
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
    const itensToDelete = await mongo.db
      //aqui deleta os itens do pedido da tabela orderItems
      .collection("orderItems")
      .deleteMany({ orderId: new ObjectId(orderId) });

    const orderToDelete = await mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(orderId) });
    const result = {
      itensToDelete,
      orderToDelete,
    };
    return result;
  }

  async updateOrder(orderId, orderData) {
    const result = await mongo.db
      .collection(collectionName)
      .updateOne({ _id: new ObjectId(orderId) }, { $set: orderData });
    return result;
  }
}
