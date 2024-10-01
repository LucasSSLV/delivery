import PlatesDataAccess from "../dataAccess/plates.js";
import {
  ok,
  plateCreated,
  plateNotExist,
  serverError,
} from "../helpers/httpResponse.js";

export default class PlatesController {
  constructor() {
    this.dataAccess = new PlatesDataAccess();
  }

  async getAllPlates() {
    try {
      const plates = await this.dataAccess.getAllPlates();
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

  //tras prato por id
  async getPlateById(plateId) {
    try {
      const plate = await this.dataAccess.getPlateById(plateId);

      if (!plate) {
        return plateNotExist();
      }

      return ok(plate);
    } catch (error) {
      return serverError(error);
    }
  }
  //adicina um novo prato
  async addPlate(plateData) {
    try {
      const result = await this.dataAccess.addPlate(plateData);

      return plateCreated(result);
    } catch (error) {
      return serverError(error);
    }
  }

  //deleta prato por id
  async deletePlateById(plateId) {
    try {
      //verifica se o prato existe antes de deletar
      const result = await this.dataAccess.deletePlate(plateId);

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  //atualiza prato por id
  async updatePlate(plateId, update) {
    try {
      const result = await this.dataAccess.updatePlate(plateId, update);

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
