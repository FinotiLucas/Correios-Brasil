import cheerio from 'cheerio';
import { request } from '../utils/request';
import { convertArrayBufferToString } from '../utils/parser';
import URL from '../utils/URL';
import {
  formatStatus,
  formatDateTime,
  formatLocal,
  formatOrigin,
  formatDestiny,
} from '../utils/formatter';

import { RastreioResponse, RastreioEvent } from '../interfaces';

function rastrearEncomendas(
  codes: Array<string>,
): Promise<void | RastreioResponse> {
  /**
   * @param {Array[String]} codes
   * Função responsável por realizar a consulta de uma ou mais encomendas
   * com base nas informações do site linkcorreios
   */

  const response: any = Promise.all(
    codes.map((code: string) => fetchTrackingService(code)),
  ).then(object => object);
  return response;
}

function fetchTrackingService(code: string): Promise<void | RastreioEvent> {
  return new Promise((resolve, reject) => {
    request(`${URL.BASERASTREIO}/${code}`, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'content-type': 'text; charset=utf-8',
        'cache-control': 'no-cache',
      },
    }).then(arrayBuffer => {
      resolve(
        convertHtmlToJson(convertArrayBufferToString(arrayBuffer, 'utf-8')),
      );
    });
  });
}

function convertHtmlToJson(htmlString: string): RastreioEvent {
  const html = cheerio.load(htmlString);
  const elemArray = [];
  html('ul.linha_status').each((_, elem) => {
    elemArray.push(elem);
  });
  elemArray.shift();
  const elemMap: any = elemArray.map(elem => {
    const mapObj = {} as RastreioEvent; // Mudar
    html(elem)
      .find('li')
      .each((_, liElem) => {
        const text = html(liElem).text();
        if (text) {
          if (text.includes('Status')) mapObj.status = formatStatus(text);
          if (text.includes('Data')) {
            const dateTime = formatDateTime(text);
            mapObj.data = dateTime[0];
            mapObj.hora = dateTime[1];
          }
          if (text.includes('Local')) mapObj.local = formatLocal(text);
          if (text.includes('Origem')) mapObj.origem = formatOrigin(text);
          if (text.includes('Destino')) mapObj.destino = formatDestiny(text);
        }
      });
    return mapObj;
  });
  return elemMap.reverse();
}

export default rastrearEncomendas;
//'LB437050160SE', 'QB226569069BR'
