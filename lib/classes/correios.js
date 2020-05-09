const fetch = require("node-fetch");
var iconv = require("iconv-lite");
const convert = require("xml-js");
const { correiosResponse } = require("../models/response.model");
const { sanitization } = require("../utils/cepHandler");
const { ServiceError } = require("../erros/serviceError");

class CorreiosBrasil {
  constructor(args) {
    /**
     *
     * @param {Array[String]} codRastreio,
     * @param {string} sCepOrigem,
     * @param {string} sCepDestino,
     * @param {string} nVlPeso,
     * @param {string} nCdFormato,
     * @param {string} nVlComprimento,
     * @param {string} nVlAltura,
     * @param {string} nVlLargura,
     * @param {string} sCdMaoPropria,
     * @param {string} nVlValorDeclarado,
     * @param {string} sCdAvisoRecebimento,
     * @param {string} nCdServico,
     * @param {string} nVlDiametro
     *
     */
    this.args = args;
    this.sCepOrigem = sanitization(args.sCepOrigem);
    this.sCepDestino = sanitization(args.sCepDestino);
    this.args.nCdEmpresa = "";
    this.args.sDsSenha = "";
    this.args.sCdMaoPropria = "n";
    this.args.nVlValorDeclarado = 0;
    this.args.sCdAvisoRecebimento = "n";
    this.url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=${this.sCepOrigem}&sCepDestino=${this.sCepDestino}&nVlPeso=${this.args.nVlPeso}&nCdFormato=${this.args.nCdFormato}&nVlComprimento=${this.args.nVlComprimento}&nVlAltura=${this.args.nVlAltura}&nVlLargura=${this.args.nVlLargura}&sCdMaoPropria=${this.args.sCdMaoPropria}&nVlValorDeclarado=${this.args.nVlValorDeclarado}&sCdAvisoRecebimento=${this.args.sCdAvisoRecebimento}&nCdServico=${this.args.nCdServico}&nVlDiametro=${this.args.nVlDiametro}&StrRetorno=xml&nIndicaCalculo=3`;
  }

  CalcPrecoPrazo() {
    /**
     * Função responsável por retornar um json com todas as informações referentes ao frete de uma encomenda
     */
    return this.fetchCorreiosService();
  }

  fetchCorreiosService() {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
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
            iconv.decode(new Buffer.from(arrayBuffer), "iso-8859-1").toString()
          )
          .then((str) => {
            dataAsJson = JSON.parse(
              convert.xml2json(str, { compact: true, spaces: 4 })
            );
            return correiosResponse(dataAsJson.Servicos.cServico);
          })
      : Error("Erro ao tentar se comunicar ao serviço dos correios.");
  }

  checkForError(responseObject) {
    return responseObject.erro === true
      ? new Error("Esse Cep não foi encontrado na base de dados.")
      : responseObject;
  }

  throwError(error) {
    const serviceError = new ServiceError({
      message: error.message,
      service: "Cálculo de prazos e preços dos Correios",
    });

    return error.name === "FetchError"
      ? (serviceError.message =
          "Erro ao se conectar com o serviço dos Correios.")
      : serviceError;
  }
}

module.exports.CorreiosBrasil = CorreiosBrasil;
