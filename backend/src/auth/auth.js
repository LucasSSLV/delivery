import express from "express";
import crypto from "crypto";
import { mongo } from "../database/mongo.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { body, validationResult } from "express-validator";
import { config } from "dotenv";

config();
const collectionName = "users";

// [Estratégia de autenticação local permanece a mesma]

const authRouter = express.Router();

// Middleware para analisar o corpo das requisições como JSON
authRouter.use(express.json());

// Lista de campos permitidos
const allowedFields = [
  "email",
  "password",
  "nome",
  "sobrenome",
  "dataDeNascimento",
];

// Rota de registro de usuário com validações usando express-validator
authRouter.post(
  "/signup",
  [
    // Validações dos campos obrigatórios
    body("email").isEmail().withMessage("Email inválido."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres."),
    body("nome").notEmpty().withMessage("O campo 'nome' é obrigatório."),
    body("sobrenome")
      .notEmpty()
      .withMessage("O campo 'sobrenome' é obrigatório."),
    body("dataDeNascimento")
      .isISO8601()
      .toDate()
      .withMessage("Data de nascimento inválida."),

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
    const errors = validationResult(req);
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
          text: "Validação falhou.",
          errors: extractedErrors,
        },
      });
    }

    const { email, password, nome, sobrenome, dataDeNascimento } = req.body;

    try {
      // Verificação se o usuário já existe
      const checkUser = await mongo.db
        .collection(collectionName)
        .findOne({ email });

      if (checkUser) {
        return res.status(400).send({
          success: false,
          statusCode: 400,
          body: {
            text: "Usuário já existe!",
          },
        });
      }

      // Geração do salt e hash da senha
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        password,
        salt,
        310000,
        16,
        "sha256",
        async (err, hashedPassword) => {
          if (err) {
            return res.status(500).send({
              success: false,
              statusCode: 500,
              body: {
                text: "Erro ao criptografar a senha!",
                error: err.message,
              },
            });
          }

          try {
            // Inserção do novo usuário no banco de dados
            const result = await mongo.db.collection(collectionName).insertOne({
              email,
              password: hashedPassword,
              nome,
              sobrenome,
              dataDeNascimento,
              salt,
            });

            if (result.insertedId) {
              const user = await mongo.db.collection(collectionName).findOne(
                { _id: new ObjectId(result.insertedId) },
                {
                  projection: {
                    password: 0,
                    salt: 0,
                  },
                }
              );

              // Geração do token JWT
              const token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });

              return res.status(201).send({
                success: true,
                statusCode: 201,
                body: {
                  text: "Usuário registrado com sucesso!",
                  token,
                  user: {
                    id: user._id,
                    email: user.email,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    dataDeNascimento: user.dataDeNascimento,
                  },
                  logged: true,
                },
              });
            } else {
              return res.status(500).send({
                success: false,
                statusCode: 500,
                body: {
                  text: "Falha ao registrar o usuário.",
                },
              });
            }
          } catch (dbError) {
            return res.status(500).send({
              success: false,
              statusCode: 500,
              body: {
                text: "Erro ao inserir usuário no banco de dados.",
                error: dbError.message,
              },
            });
          }
        }
      );
    } catch (error) {
      return res.status(500).send({
        success: false,
        statusCode: 500,
        body: {
          text: "Erro interno do servidor.",
          error: error.message,
        },
      });
    }
  }
);

// [Rota de login permanece a mesma]

export default authRouter;
