import express, { text } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import { mongo } from "../database/mongo.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const collectionName = "users";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, callback) => {
      // Busca o usuário
      const user = await mongo.db.collection(collectionName).findOne({
        email: email,
      });

      // Verifica se o usuário existe
      if (!user) {
        return callback(null, false);
      }

      const saltBuffer = user.salt.buffer;

      crypto.pbkdf2(
        password,
        saltBuffer,
        310000,
        16,
        "sha256",
        (err, hashedPassword) => {
          if (err) {
            return callback(err, false);
          }

          const userPasswordBuffer = Buffer.from(user.password.buffer);

          if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
            return callback(null, false);
          }

          const { password, salt, ...rest } = user;
          return callback(null, rest);
        }
      );
    }
  )
);

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Verifica se o usuário já existe
    const checkUser = await mongo.db
      .collection(collectionName)
      .findOne({ email: req.body.email });

    if (checkUser) {
      return res.status(500).send({
        success: false,
        statusCode: 500,
        body: {
          text: "User already exists!",
        },
      });
    }

    // Gera o salt e faz a criptografia da senha
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
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
              text: "Error encrypting password!",
              err: err,
            },
          });
        }

        // Insere o novo usuário no banco
        const result = await mongo.db.collection(collectionName).insertOne({
          email: req.body.email,
          password: hashedPassword,
          salt,
        });

        if (result.insertedId) {
          const user = await mongo.db
            .collection(collectionName)
            .findOne({ _id: new ObjectId(result.insertedId) });

          const token = jwt.sign(user, "secret");

          return res.send({
            success: true,
            statusCode: 200,
            body: {
              text: "User registered successfully!",
              token,
              user,
              logged: true,
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
        text: "Internal server error",
        error: error.message,
      },
    });
  }
});

//atenticação de user
authRouter.post("/login", (req, res) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      return res.send({
        success: false,
        statusCode: 500,
        body: {
          text: "Error during authentication!",
          error,
        },
      });
    }
    if (!user) {
      return res.send({
        success: false,
        statusCode: 400,
        body: {
          text: "User not found!",
        },
      });
    }
    const token = jwt.sign(user, "secret");
    return res.send({
      success: true,
      statusCode: 200,
      body: {
        text: "User logged correctly!",
        user,
        token,
      },
    });
  })(req, res);
});
export default authRouter;
