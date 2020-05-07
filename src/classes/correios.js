const fetch = require("node-fetch");
var iconv = require("iconv-lite");
const convert = require("xml-js");
const models = require("../models/response.model");
const {fetchFromAPI} = require("./rastreio");

//
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
  }

  rastrearEncomendas() {
    return fetchFromAPI(this.args.codRastreio);
  }

  consultarCEP() {
    /**
     * Função responsável por realizar a consulta de um CEP já higienizado e retornar um Json com a resposta
     */
    const cep = this.sanitization(this.args.sCepDestino);
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
      .finally((response) => {
        return response;
      });

    function fetchHandler(response) {
      /**
       * Lida com os possíveis erros.
       */

      if (response.ok) {
        return response
          .json()
          .then((json) => {
            // the status was ok and there is a json body
            return Promise.resolve({ json: json, response: response });
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

  calcularPreço() {
    /**
     * Função responsável por retornar um json com todas as informações referentes ao frete de uma encomenda
     */
    const sCepOrigem = this.sanitization(this.args.sCepOrigem);
    const sCepDestino = this.sanitization(this.args.sCepDestino);
    const url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=${sCepOrigem}&sCepDestino=${sCepDestino}&nVlPeso=${this.args.nVlPeso}&nCdFormato=${this.args.nCdFormato}&nVlComprimento=${this.args.nVlComprimento}&nVlAltura=${this.args.nVlAltura}&nVlLargura=${this.args.nVlLargura}&sCdMaoPropria=${this.args.sCdMaoPropria}&nVlValorDeclarado=${this.args.nVlValorDeclarado}&sCdAvisoRecebimento=${this.args.sCdAvisoRecebimento}&nCdServico=${this.args.nCdServico}&nVlDiametro=${this.args.nVlDiametro}&StrRetorno=xml&nIndicaCalculo=3`;

    let dataAsJson = {};

    const response = fetch(url).then((response) => fetchHandler(response));

    function fetchHandler(response) {
      /**
       * Lida com os possíveis erros.
       */
      if (response.ok) {
        return response
          .arrayBuffer()
          .then((arrayBuffer) =>
            iconv.decode(new Buffer.from(arrayBuffer), "iso-8859-1").toString()
          )
          .then((str) => {
            dataAsJson = JSON.parse(
              convert.xml2json(str, { compact: true, spaces: 4 })
            );
            const data = models.calcularPreçoModel(
              dataAsJson.Servicos.cServico
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

  sanitization(cep) {
    /**
     * Função responsável por realizar a higienização dos CEPS, deixando apenas caracteres válidos.
     */
    const result = cep.replace(/[^0-9]|[/ /]/g, "");
    try {
      if (this.validation(result)) {
        return result;
      }
    } catch (err) {
      console.error();
    }
  }

  validation(sanitizedZip) {
    /**
     * Verifica se o cep possui a quantidade correta de digitos
     */
    if (sanitizedZip.length === 8) {
      return true;
    } else return false;
  }
}

module.exports.CorreiosBrasil = CorreiosBrasil;
