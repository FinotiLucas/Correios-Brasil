import querystring from 'querystring';
import URL from '../utils/URL';
import { sanitization } from '../utils/validation';
import { request } from '../utils/request';
import {
  convertArrayBufferToString,
  convertXMLStringToJson,
} from '../utils/parser';
import {
  PrecoPrazoRequest,
  PrecoPrazoResponse,
  PrecoPrazoEvent,
} from '../interfaces';

function calcularPrecoPrazo(
  precoPrazo: PrecoPrazoRequest,
): Promise<void | PrecoPrazoResponse> {
  /**
   * @param {Object} precoPrazo
   * Função responsável por realizar a consulta dos valores de entrega das
   * encomendas com base na api dos correios.
   */

  const codes = precoPrazo.nCdServico;

  const response: any = Promise.all(
    codes.map((code: string) => fetchPrecoPrazo(precoPrazo, code)),
  ).then(object => object);
  return response;
}

function fetchPrecoPrazo(precoPrazo: PrecoPrazoRequest, code: string) {
  delete precoPrazo.nCdServico;
  return new Promise((resolve, reject) => {
    const qs: any = {
      ...precoPrazo,
      ...{
        nCdServico: code,
        sCepOrigem: sanitization(precoPrazo.sCepOrigem),
        sCepDestino: sanitization(precoPrazo.sCepDestino),
        nCdEmpresa: '',
        sDsSenha: '',
        sCdMaoPropria: 'n',
        nVlValorDeclarado: 0,
        sCdAvisoRecebimento: 'n',
        StrRetorno: 'xml',
        nIndicaCalculo: 3,
      },
    };

    return request(`${URL.BASECORREIOS}?${querystring.stringify(qs)}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      responseType: 'arraybuffer',
    }).then((arrayBuffer: ArrayBuffer) => {
      const rawJson = convertXMLStringToJson(
        convertArrayBufferToString(arrayBuffer, 'iso-8859-1'),
      );
      resolve(convertJsonToPrazoPrecoResponse(rawJson.Servicos.cServico));
    });
  });
}

function convertJsonToPrazoPrecoResponse(obj: any): PrecoPrazoEvent {
  const precoPrazoResponse = Object.keys(obj).reduce((acc: any, key) => {
    acc[key] = obj[key]._text ? obj[key]._text : obj[key]._cdata;
    return acc;
  }, {} as PrecoPrazoEvent);
  return precoPrazoResponse;
}

export default calcularPrecoPrazo;
