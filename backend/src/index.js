import express from "express";
import cors from "cors";

const main = async () => {
  const hostname = "localhost";
  const port = 3001;

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send({
      message: "Hello World!",
      success: true,
      statusCode: 200,
    });
  });

  app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
  });
};

main();
