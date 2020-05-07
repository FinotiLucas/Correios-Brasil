const fetch = require("node-fetch");
const {sanitization} = require('../utils/cepHandler')

class CepBrasil {
    constructor(args) {
        this.args = args
    }
    consultarCEP() {
        /**
         * Função responsável por realizar a consulta de um CEP já higienizado e retornar um Json com a resposta
         */
        const cep = sanitization(this.args);
        const url = `https://viacep.com.br/ws/${cep}/json`;

        const response = fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => {
                return fetchHandler(response);
            })

        function fetchHandler(response) {
            /**
             * Lida com os possíveis erros.
             */

            if (response.ok) {
                return response
                    .json()
                    .then((json) => {
                        // the status was ok and there is a json body
                        return Promise.resolve({ data: json, response: response });
                    })
                    .catch((err) => {
                        // the status was ok but there is no json body
                        return Promise.resolve({ response: response });
                    });
            } else {
                return response
                    .json()
                    .catch((err) => {
                        // the status was not ok and there is no json body
                        throw new Error(response.statusText);
                    })
                    .then((json) => {
                        // the status was not ok but there is a json body
                        throw new Error("json.error.message"); // example error message returned by a REST API
                    });
            }
        }
        return response;
    }
}

module.exports.CepBrasil = CepBrasil;