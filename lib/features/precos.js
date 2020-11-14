const querystring = require("querystring");
const { URL } = require("../utils/URL");
const { sanitization } = require("../utils/validation");
const { request } = require("../utils/request");
const { correiosResponse } = require("../models/response");
const {
  convertArrayBufferToString,
  convertXMLStringToJson,
} = require("../utils/parser");


function calcularPrecoPrazo(precoPrazo) {
  /**
   * @param {Object} precoPrazo
   * Função responsável por realizar a consulta dos valores de entrega das
   * encomendas com base na api dos correios.
   */

  const codes = precoPrazo.nCdServico
  delete precoPrazo.nCdServico
  const response = Promise.all(
    codes.map((code) => fetchPrecoPrazo(precoPrazo, code))
  ).then((object) => {
    const { ...events } = object;
    return events;
  });
  return response;
}

function fetchPrecoPrazo(precoPrazo, code) {
  return new Promise((resolve, reject) => {
    const qs = {
      ...precoPrazo,
      ...{
        nCdServico: code,
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
};

module.exports = { calcularPrecoPrazo };
