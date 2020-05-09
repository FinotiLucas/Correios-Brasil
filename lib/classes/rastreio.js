const fetch = require("node-fetch");
var iconv = require("iconv-lite");
var convert = require("xml-js");
const { rastreioResponse } = require("../models/response.model");
const { ServiceError } = require("../erros/serviceError");

class RastreioBrasil {
  constructor(objects) {
    /**
     * @param {Array[String]} objects,
     */
    this.objects = objects;
    this.url = "https://webservice.correios.com.br/service/rastro";
  }

  rastrearEncomendas() {
    /**
     * Função responsável por retornar um json com todas as informações referentes ao frete de uma encomenda
     */
    return this.fetchTrackingService();
  }

  fetchTrackingService() {
    const options = {
      method: "POST",
      body: this.createSOAPEnvelope(),
      mode: "no-cors",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "cache-control": "no-cache",
      },
    };

    const response = fetch(this.url, options)
      .then(this.handleResponse)
      .then(this.checkForError)
      .catch(this.throwError);

    return response;
  }

  handleResponse(response) {
    let dataAsJson = {};
    return response.ok
      ? response
          .arrayBuffer()
          .then((arrayBuffer) =>
            iconv.decode(new Buffer.from(arrayBuffer), "utf-8").toString()
          )
          .then((str) => {
            dataAsJson = JSON.parse(
              convert.xml2json(str, { compact: true, spaces: 4 })
            );
            const data = rastreioResponse(
              dataAsJson["soapenv:Envelope"]["soapenv:Body"][
                "ns2:buscaEventosListaResponse"
              ].return.objeto
            );
            return data;
          })
      : Error("Erro ao tentar se comunicar ao serviço dos correios.");
  }

  checkForError(responseObject) {
    return responseObject.erro === true
      ? new Error("Esse Objeto não foi encontrado na base de dados.")
      : responseObject;
  }

  throwError(error) {
    const serviceError = new ServiceError({
      message: error.message,
      service: "Rastreio de encomendas",
    });

    return error.name === "FetchError"
      ? (serviceError.message =
          "Erro ao se conectar com o serviço dos Correios.")
      : serviceError;
  }

  createSOAPEnvelope() {
    let envelope = `<?xml version="1.0"?>\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:res="http://resource.webservice.correios.com.br/">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <res:buscaEventosLista>\n`;

    if (this.configParams().username && this.configParams().password) {
      envelope += `         <usuario>${
        this.configParams().username
      }</usuario>\n         <senha>${this.configParams().password}</senha>\n`;
    }

    envelope += `         <tipo>${
      this.configParams().type
    }</tipo>\n         <resultado>${
      this.configParams().result
    }</resultado>\n         <lingua>${this.configParams().language}</lingua>\n`;

    this.objects.forEach((object) => {
      envelope += `         <objetos>${object}</objetos>\n`;
    });

    envelope += `      </res:buscaEventosLista>\n   </soapenv:Body>\n</soapenv:Envelope>`;
    return envelope;
  }

  configParams() {
    const config = {
      username: "ECT",
      password: "SRO",
      type: "L",
      result: "T",
      language: "101",
      limit: 5000,
      filter: true,
    };
    return config;
  }
}

module.exports.RastreioBrasil = RastreioBrasil;
