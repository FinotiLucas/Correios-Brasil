const fetch = require("node-fetch");
var iconv = require("iconv-lite");
const cheerio = require("cheerio");

class RastreioBrasil {
  constructor(code) {
    /**
     * @param {String} code,
     */
    this.code = code;
    this.url = "https://www.linkcorreios.com.br/";
  }

  rastrearEncomendas() {
    return this.fetchTrackingService();
  }

  fetchTrackingService() {
    const options = {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "text; charset=utf-8",
        "cache-control": "no-cache",
      },
    };

    const response = fetch(this.url + this.code, options)
      .then(this.handleResponse)
      .then(this.checkForError)
      .then((response) => this.handleBody(response));

    return response;
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
      return { events: ret };
    }
  }

  wrapData(html, strs, ret) {
    html(".linha_status").each(function (index, elem) {
      strs.push(elem);
    });
    strs.forEach((element) => {
      let status, data, local, origem, destino;
      html(element)
        .find("li")
        .each(function (index, elem) {
          let text = html(elem).text();
          if (text && text.includes("Status")) {
            status = text;
          }
          if (text && text.includes("Data")) {
            data = text;
          }
          if (text && text.includes("Local")) {
            local = text;
          }
          if (text && text.includes("Origem")) {
            origem = text;
          }
          if (text && text.includes("Destino")) {
            destino = text;
          }
        });
      ret.push({
        status: status ? status : undefined,
        data: data ? data : undefined,
        local: local ? local : undefined,
        origem: origem ? origem : undefined,
        destino: destino ? destino : undefined,
      });
    });
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
}

module.exports.RastreioBrasil = RastreioBrasil;
