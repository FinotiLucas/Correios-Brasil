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
): Promise<PrecoPrazoResponse> {
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

function fetchPrecoPrazo(p: PrecoPrazoRequest, code: string) {
  delete p.nCdServico;
  return new Promise(async (resolve, reject) => {
    const qs: any = {
      ...p,
      ...{
        nCdServico: code,
        sCepOrigem: sanitization(p.sCepOrigem),
        sCepDestino: sanitization(p.sCepDestino),
        nCdEmpresa: p.nCdEmpresa == undefined ? '' : p.nCdEmpresa,
        sDsSenha: p.sDsSenha == undefined ? '' : p.sDsSenha,
        sCdMaoPropria: p.sCdMaoPropria == undefined ? 'n' : p.sCdMaoPropria,
        nVlValorDeclarado:
          p.nVlValorDeclarado == undefined ? 0 : p.nVlValorDeclarado,
        sCdAvisoRecebimento:
          p.sCdAvisoRecebimento == undefined ? 'n' : p.sCdAvisoRecebimento,
        StrRetorno: 'xml',
        nIndicaCalculo: p.nIndicaCalculo == undefined ? 3 : p.nIndicaCalculo,
      },
    };

    return request(
      `${URL.BASECORREIOS}?${new URLSearchParams(qs).toString()}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'text/xml',
        },
        responseType: 'arraybuffer',
      },
    )
      .then((arrayBuffer: any) => {
        const rawJson = convertXMLStringToJson(
          convertArrayBufferToString(arrayBuffer.data, 'iso-8859-1'),
        );
        return resolve(
          convertJsonToPrazoPrecoResponse(rawJson.Servicos.cServico),
        );
      })
      .catch((error: any) => {
        reject(error);
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
