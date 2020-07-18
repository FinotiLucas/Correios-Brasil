/**
 * Funções responsáveis por operações de cep
 */
const { sanitization } = require("../utils/validation");
const { request } = require("../utils/request");
const { URL } = require("../utils/URL");

module.exports = {
  consultarCep(cep) {
    /**
     * @param {string} cep
     */
    return new Promise((resolve, reject) =>
      request(`${URL.BASECEP}/${sanitization(cep)}/json`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((body) => {
        if (body.erro) reject(Error(`Cep: ${cep} não existe na nossa base`));
        return resolve(body);
      })
    );
  },
};
