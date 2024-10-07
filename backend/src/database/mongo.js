import { MongoClient } from "mongodb";
//fazendo a conexão com o banco de dados
export const mongo = {
  async connect({ mongoConnectionString, mongoDbName }) {
    try {
      const client = new MongoClient(mongoConnectionString);
      await client.connect();
      const db = client.db(mongoDbName);

      this.client = client;
      this.db = db;

      return "Connected to mongoDB";
    } catch (error) {
      return { text: "error", error };
    }
  },
};
