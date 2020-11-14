const cheerio = require("cheerio");

const { request } = require("../utils/request");
const { convertArrayBufferToString } = require("../utils/parser");
const { URL } = require("../utils/URL");
const {
  formatStatus,
  formatDateTime,
  formatLocal,
  formatOrigin,
  formatDestiny,
} = require("../utils/formatter");

function rastrearEncomendas(codes) {
  /**
   * @param {Array[String]} codes
   * Função responsável por realizar a consulta de uma ou mais encomendas
   * com base nas informações do site linkcorreios
   */

  const response = Promise.all(
    codes.map((code) => fetchTrackingService(code))
  ).then((object) => {
    const { ...events } = object;
    return events;
  });
  return response;
}

function fetchTrackingService(code) {
  return new Promise((resolve, reject) => {
    request(`${URL.BASERASTREIO}/${code}`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "content-type": "text; charset=utf-8",
        "cache-control": "no-cache",
      },
    }).then((arrayBuffer) => {
      resolve(
        convertHtmlToJson(convertArrayBufferToString(arrayBuffer, "utf-8"))
      );
    });
  });
}

function convertHtmlToJson(htmlString) {
  const html = cheerio.load(htmlString);
  const elemArray = [];
  html("ul.linha_status").each((_, elem) => {
    elemArray.push(elem);
  });
  elemArray.shift()
  const elemMap = elemArray.map((elem) => {
    const mapObj = {};
    html(elem)
      .find("li")
      .each((_, liElem) => {
        const text = html(liElem).text();
        if (text) {
          if (text.includes("Status")) mapObj.status = formatStatus(text);
          if (text.includes("Data")) {
            const dateTime = formatDateTime(text);
            mapObj.data = dateTime[0];
            mapObj.hora = dateTime[1];
          }
          if (text.includes("Local")) mapObj.local = formatLocal(text);
          if (text.includes("Origem")) mapObj.origem = formatOrigin(text);
          if (text.includes("Destino")) mapObj.destino = formatDestiny(text);
        }
      });
    return mapObj;
  });
  return elemMap.reverse();
}

module.exports = { rastrearEncomendas };
