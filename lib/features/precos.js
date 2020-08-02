const querystring = require("querystring");
const { URL } = require("../utils/URL");
const { sanitization } = require("../utils/validation");
const { request } = require("../utils/request");
const { correiosResponse } = require("../models/response");
const {
  convertArrayBufferToString,
  convertXMLStringToJson,
} = require("../utils/parser");

module.exports = {
  calcularPrecoPrazo(precoPrazo) {
    /**
     * @param {Object} precoPrazo
     * Função responsável por realizar a consulta do valor de entrega de uma
     * encomenda com base na api dos correios.
     */
    return new Promise((resolve, reject) => {
      const qs = {
        ...precoPrazo,
        ...{
          sCepOrigem: sanitization(precoPrazo.sCepOrigem),
          sCepDestino: sanitization(precoPrazo.sCepDestino),
          nCdEmpresa: "",
          sDsSenha: "",
          sCdMaoPropria: "n",
          nVlValorDeclarado: 0,
          sCdAvisoRecebimento: "n",
          StrRetorno: "xml",
          nIndicaCalculo: 3,
        },
      };

      return request(`${URL.BASECORREIOS}?${querystring.stringify(qs)}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((arrayBuffer) => {
        const rawJson = convertXMLStringToJson(
          convertArrayBufferToString(arrayBuffer, "iso-8859-1")
        );
        resolve(correiosResponse(rawJson.Servicos.cServico));
      });
    });
  },
};
