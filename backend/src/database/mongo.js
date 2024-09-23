import { MongoClient } from "mongodb";
import { connect } from "venom-bot";
//fazendo a conexão com o banco de dados
export const mongo = {
  async connect({ mongoConnectionString, mongoDbName }) {
    try {
      const client = new MongoClient(mongoConnectionString);
      await client.connect();
      const db = client.db(mongoDbName);

      this.client = client;
      this.db = db;
    } catch (error) {
      console.log("Error connecting to MongoDB: ", error);
    }
  },
};
