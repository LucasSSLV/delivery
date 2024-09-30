import PlatesDataAccess from "../dataAccess/plates.js";
import {
  dadosIncompletos,
  notFound,
  ok,
  plateAlreadyExist,
  plateCreated,
  plateNotExist,
  serverError,
  userNotExist,
} from "../helpers/httpResponse.js";

export default class PlatesController {
  constructor() {
    this.dataAccess = new PlatesDataAccess();
  }

  async getPlates() {
    try {
      const plates = await this.dataAccess.getPlates();
      return ok(plates);
    } catch (error) {
      return serverError(error);
    }
  }
  // tras a lista de usuarios do banco de dados
  async getAvailiablePlates() {
    try {
      const plates = await this.dataAccess.getAvailiablePlates();
      return ok(plates);
    } catch (error) {
      return serverError(error);
    }
  }

  // //trás usuário por id
  // async getPlateById(id) {
  //   try {
  //     const plateById = await this.dataAccess.getPlateById(id);
  //     if (plateById) {
  //       return ok(plateById);
  //     }
  //     return notFound();
  //   } catch (error) {
  //     return serverError(error);
  //   }
  // }

  //adicina um novo prato
  //aqui primeiro verificamos se o prato já existe, para depois adicionar um novo prato
  async addPlate(plateData) {
    try {
      const result = await this.dataAccess.addPlate(plateData);

      return plateCreated(result);
    } catch (error) {
      return serverError(error);
    }
  }
  
  //deleta usuário por id
  async deletePlateById(plateId) {
    try {
      //verifica se o usuário existe antes de deletar
      const result = await this.dataAccess.deletePlate(plateId);

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  //atualiza usuário por id
  async updatePlate(plateId, update) {
    try {
      const result = await this.dataAccess.updatePlate(plateId, update);

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
