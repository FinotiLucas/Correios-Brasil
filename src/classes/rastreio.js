const fetch = require("node-fetch");
var iconv = require("iconv-lite");
var convert = require("xml-js");
const models = require("../models/response.model");

/**
 * ESCREVER COMO CLASSE
 *
 */

const configParams = {
  username: "ECT",
  password: "SRO",
  type: "L",
  result: "T",
  language: "101",
  limit: 5000,
  filter: true,
};

const url = "https://webservice.correios.com.br/service/rastro";

function fetchFromAPI(objects) {
  let dataAsJson = {};

  const options = {
    method: "POST",
    body: createSOAPEnvelope(objects),
    mode: "no-cors",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "cache-control": "no-cache",
    },
  };

  const response = fetch(url, options).then((response) =>
    fetchHandler(response)
  );

  function fetchHandler(response) {
    /**
     * Lida com os possíveis erros.
     */
    if (response.ok) {
      return response
        .arrayBuffer()
        .then((arrayBuffer) =>
          iconv.decode(new Buffer.from(arrayBuffer), "utf-8").toString()
        )
        .then((str) => {
          dataAsJson = JSON.parse(
            convert.xml2json(str, { compact: true, spaces: 4 })
          );
          const data = models.rastreioModel(
            dataAsJson["soapenv:Envelope"]["soapenv:Body"][
              "ns2:buscaEventosListaResponse"
            ].return.objeto.evento
          );
          return Promise.resolve({
            json: data,

            response: response,
          });
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
          throw new Error(json.error.message); // example error message returned by a REST API
        });
    }
  }

  return response;
}

function createSOAPEnvelope(objects) {
  let envelope = `<?xml version="1.0"?>\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:res="http://resource.webservice.correios.com.br/">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <res:buscaEventosLista>\n`;

  if (configParams.username && configParams.password) {
    envelope += `         <usuario>${configParams.username}</usuario>\n         <senha>${configParams.password}</senha>\n`;
  }

  envelope += `         <tipo>${configParams.type}</tipo>\n         <resultado>${configParams.result}</resultado>\n         <lingua>${configParams.language}</lingua>\n`;

  objects.forEach((object) => {
    envelope += `         <objetos>${object}</objetos>\n`;
  });

  envelope += `      </res:buscaEventosLista>\n   </soapenv:Body>\n</soapenv:Envelope>`;
  return envelope;
}

module.exports.fetchFromAPI = fetchFromAPI;
