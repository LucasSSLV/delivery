import express from "express";
import PlatesController from "../controllers/plates.js";
import { body, validationResult as validate } from "express-validator";

const platesRouter = express.Router();
const platesControllers = new PlatesController();

// 1. Rota específica que traz pratos disponíveis
platesRouter.get("/availiable", async (req, res) => {
  const { success, statusCode, body } =
    await platesControllers.getAvailiablePlates();

  res.status(statusCode).json({ success, statusCode, body });
});
// 2. Rota geral que traz a lista de pratos do banco de dados
platesRouter.get("/", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.getAllPlates();
  res.status(statusCode).json({ success, statusCode, body });
});

// 3. Rota que adiciona um novo prato
const allowedFields = [
  "name",
  "price",
  "availiable",
  "description",
  "ingredients",
  "category",
];

// 3. Rota que adiciona um novo prato
platesRouter.post(
  "/",
  [
    // Valida se os campos estão preenchidos
    body("name").notEmpty().withMessage("Campo 'name' é obrigatório"),
    body("price").notEmpty().withMessage("Campo 'price' é obrigatório"),
    body("availiable").notEmpty().withMessage("Campo 'available' é obrigatório"), // Corrigido
    body("description")
      .notEmpty()
      .withMessage("Campo 'description' é obrigatório"),
    body("ingredients")
      .notEmpty()
      .withMessage("Campo 'ingredients' é obrigatório"),
    body("category").notEmpty().withMessage("Campo 'category' é obrigatório"),

    // Validação personalizada para impedir campos extras
    body().custom((body) => {
      const extraFields = Object.keys(body).filter(
        (key) => !allowedFields.includes(key)
      );
      if (extraFields.length > 0) {
        throw new Error(
          `Campos extras não permitidos: ${extraFields.join(", ")}`
        );
      }
      return true;
    }),
  ],
  async (req, res) => {
    // Use um nome diferente para evitar conflito com a função importada
    const errors = validate(req);
    if (!errors.isEmpty()) {
      // Extrair mensagens de erro
      const extractedErrors = errors.array().map((err) => ({
        msg: err.msg,
        param: err.param,
      }));

      return res.status(400).send({
        success: false,
        statusCode: 400,
        body: {
          text: "Confira os campos",
          errors: extractedErrors,
        },
      });
    }

    try {
      const { success, statusCode, body } = await platesControllers.addPlate(
        req.body
      );
      res.status(statusCode).json({ success, statusCode, body });
    } catch (error) {
      // Tratamento de erros adicionais
      res.status(500).json({
        success: false,
        statusCode: 500,
        body: { message: "Erro interno do servidor" },
      });
    }
  }
);

// 4. Rota que atualiza um prato por ID
platesRouter.put("/:id", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.updatePlate(
    req.params.id,
    req.body
  );
  res.status(statusCode).json({ success, statusCode, body });
});

// 5. Rota que deleta um prato por ID
platesRouter.delete("/:id", async (req, res) => {
  const { success, statusCode, body } = await platesControllers.deletePlateById(
    req.params.id
  );
  res.status(statusCode).json({ success, statusCode, body });
});

export default platesRouter;
