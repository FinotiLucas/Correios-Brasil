import { request } from '../utils/request';
import URL from '../utils/URL';

function rastrearEncomendas(codes: Array<string>): Promise<any> {
  /**
   * @param {Array[String]} codes
   * Função responsável por realizar a consulta de uma ou mais encomendas
   */

  const response: any = Promise.all(
    codes.map((code: string) => fetchTrackingService(code)),
  ).then(object => object);
  return response;
}

function fetchTrackingService(code: string): Promise<any> {
  /**
   * @param {string} code
   */

  return new Promise((resolve, reject) =>
    request(`${URL.PROXYAPP}/${code}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((body: any) => {
        return resolve(body.data.objetos[0]);
      })
      .catch((error: any) => {
        reject(error);
      }),
  );
}

export default rastrearEncomendas;
