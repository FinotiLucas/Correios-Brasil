const fetch = require("node-fetch");
var iconv = require("iconv-lite");
const cheerio = require("cheerio");
const { ServiceError } = require("../erros/serviceError");

class RastreioBrasil {
  constructor() {
    /**
     * @param {Array[String]} code,
     */
    this.data = [];
    this.code;
  }
  rastrearEncomendas(code) {
    this.code = code;
    return this.mapObjects();
  }

  mapObjects() {
    const response = Promise.all(
      this.code.map((code) => this.fetchTrackingService(code))
    ).then(() => {
      const { ...events } = this.data;
      return events;
    });
    return response;
  }

  fetchTrackingService(code) {
    const url = "https://www.linkcorreios.com.br/";

    const options = {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "text; charset=utf-8",
        "cache-control": "no-cache",
      },
    };
    return fetch(url + code, options)
      .then(this.handleResponse)
      .then(this.checkForError)
      .then((response) => this.handleBody(response))
      .catch(this.throwError);
  }

  handleResponse(response) {
    return response.ok
      ? response.arrayBuffer().then((arrayBuffer) => {
          const data = iconv
            .decode(new Buffer.from(arrayBuffer), "utf-8")
            .toString();
          return data;
        })
      : Error("Erro ao tentar se comunicar ao serviço dos correios.");
  }

  handleBody(responseObject) {
    var strs = [];
    var ret = [];
    var html = cheerio.load(responseObject);
    this.wrapData(html, strs, ret);
    if (!ret.length) {
      return { events: [] };
    } else {
      ret = JSON.parse(JSON.stringify(ret.reverse()));
      ret.shift();
      this.data.push(ret);
    }
  }

  wrapData(html, strs, ret) {
    html(".linha_status").each(function (index, elem) {
      strs.push(elem);
    });
    strs.forEach((element) => {
      let responseObject = {};
      html(element)
        .find("li")
        .each(function (index, elem) {
          let text = html(elem).text();
          if (text && text.includes("Status")) {
            responseObject.status = text;
          }
          if (text && text.includes("Data")) {
            responseObject.data = text;
          }
          if (text && text.includes("Local")) {
            responseObject.local = text;
          }
          if (text && text.includes("Origem")) {
            responseObject.origem = text;
          }
          if (text && text.includes("Destino")) {
            responseObject.destino = text;
          }
        });
      ret.push(responseObject);
    });
  }

  checkForError(responseObject) {
    return responseObject.erro === true
      ? Error("Esse Objeto não foi encontrado na base de dados.")
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
}

module.exports.RastreioBrasil = RastreioBrasil;
