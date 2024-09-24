import express from "express";
import passpot, { use } from "passport";
import localStrategy from "passport-local";
import crypto from "crypto";
import { mongo } from "./database/mongo.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { error } from "console";

const collectionName = "users";

passpot.use(
  new localStrategy(
    { usernameField: "email" },
    async (email, password, callback) => {
      //busca usuário
      const user = await mongo.ObjectId.collection(collectionName).findOnde({
        email: email,
      });
      //verifica se usuário existe
      if (!user) {
        return callback(null, false);
      }
      const saltBuffer = user.salt.saltBuffer;

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
