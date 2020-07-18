const querystring = require("querystring");
const { URL } = require("../utils/URL");
const { sanitization } = require("../utils/validation");
const { request } = require("../utils/request");
const { correiosResponse } = require("../models/response.model");
const {
  convertArrayBufferToString,
  convertXMLStringToJson,
} = require("../utils/parser");

/**
 * @param {PrecoPrazoRequest} precoPrazo
 */

module.exports = {
  calcularPrecoPrazo(precoPrazo) {
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
