import express from "express";
import cors from "cors";
import { mongo } from "./database/mongo.js";
//forma certa de importar o dotenv
import pkg from "dotenv";
//forma certa de desestruturar o config de dentro do dotenv
const { config } = pkg;

config();
const main = async () => {
  const hostname = "localhost";
  const port = 3001;

  const app = express();

  const mongoConnection = await mongo.connect({
    mongoConnectionString: process.env.MONGO_CS,
    mongoDbName: process.env.MONGO_DB_NAME,
  });

  console.log(mongoConnection);

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send({
      success: true,
      statusCode: 200,
      body: "welcome to delivery app",
    });
  });

  app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
  });
};

main();
