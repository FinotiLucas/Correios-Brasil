const fetch = require("node-fetch");
const { sanitization } = require("../utils/cepHandler");
const { ServiceError } = require("../erros/serviceError");

class CepBrasil {
  constructor() {
    /**
     * @param {String} cep,
     */

    this.cep;
  }

  consultarCEP(cep) {
    this.cep = sanitization(cep);
    return this.fetchViaCepService();
  }

  fetchViaCepService() {
    const url = `https://viacep.com.br/ws/${this.cep}/json/`;

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    const response = fetch(url, options)
      .then(this.handleResponse)
      .then(this.checkForError)
      .catch(this.throwServiceError);

    return response;
  }

  handleResponse(response) {
    return response.ok
      ? response.json().then((json) => {
          // the status was ok and there is a json body
          return json;
        })
      : Error("Erro ao tentar se comunicar ao serviço.");
  }

  checkForError(responseObject) {
    return responseObject.erro === true
      ? new Error("Esse Cep não foi encontrado na base de dados.")
      : responseObject;
  }

  throwServiceError(error) {
    const serviceError = new ServiceError({
      message: error.message,
      service: "viacep",
    });

    return error.name === "FetchError"
      ? (serviceError.message = "Erro ao se conectar com o serviço.")
      : serviceError;
  }
}

module.exports.CepBrasil = CepBrasil;
