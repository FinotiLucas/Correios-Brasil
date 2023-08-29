import { request } from '../utils/request';
import URL from '../utils/URL';
import crypto from 'crypto';

const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const year = String(currentDate.getFullYear());
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

// Token Constante da requisição de PROXYAPP_RASTREAR
const REQUEST_TOKEN = "rPgi596V7vNHkEJwJA0eW30hUeJNqvKcHVdhfcX3CDuNCFu3KT5XgkbDf2iFc/g7nuGbFx4bNOBUEieF0k+jICMcWRN+ug0asYGwMM511vBzfbLotGy6IR5Ya0jUjx+N/EAhJM3jjxYUudPZLWIdwoL/B23mPvbQEXAyWcEAxHS7JUOgC9p/Zj/RHXtF9W3iK1TfRdk1CjNP5UmwUdGWwawgvfPY7Fof9nPrHMz/MkeYn0/PSemHHhJ3TdHCFc0h/MrWDSjsTtznZbpQcZZL4rAes9vOoN8SWJgyLmK21qXeErdB1OljK/VYbBvTfTzEcoOWM3/4Z3jGPyxM+a77Mg=="
// 'YW5kcm9pZDtici5jb20uY29ycmVpb3MucHJlYXRlbmRpbWVudG87RjMyRTI5OTc2NzA5MzU5ODU5RTBCOTdGNkY4QTQ4M0I5Qjk1MzU3ODs1LjEuMTQ=';
// const REQUEST_DATA = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
// const REQUEST_SIGN = crypto
//   .createHash('md5')
//   .update(`requestToken${REQUEST_TOKEN}data${REQUEST_DATA}`)
//   .digest('hex');

// Guarda o token em cache e a data de expiração
let tokenValue: string = null;
let tokenExpiration: number = 0;
let tokenPromise: Promise<string> = null;

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

function gerarTokenApp(): Promise<string> {
  /**
   * Função responsável por gerar um token para realizar a consulta de encomendas caso o token não esteja em cache
   */

  // Checa se o token está em cache e se não está expirado
  if (tokenValue && tokenExpiration > Date.now()) {
    return Promise.resolve(tokenValue);
  }

  // Checa se já existe uma promise de token em andamento
  if (tokenPromise) {
    return tokenPromise;
  }

  // Cria uma nova promise de token
  tokenPromise = new Promise((resolve, reject) => {
    request(URL.PROXYAPP_TOKEN, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Dart/2.18 (dart:io)',
      },
      data: {
        requestToken: REQUEST_TOKEN
        // data: REQUEST_DATA,
        // sign: REQUEST_SIGN,
      },
    })
      .then((body: any) => {
        tokenPromise = null;
        const jwt = body.data.token;
        // Parseia o JWT para pegar a data de expiração (iat)
        const jwtData = jwt.split('.')[1];
        const jwtBuffer = Buffer.from(jwtData, 'base64');
        const jwtString = jwtBuffer.toString('ascii');
        const jwtObject = JSON.parse(jwtString);
        // Guarda o token em cache e a data de expiração
        tokenValue = jwt;
        tokenExpiration = jwtObject.exp * 1000 - 120000; // 120 segundos de margem
        resolve(jwt);
      })
      .catch((err: any) => {
        tokenValue = null;
        tokenExpiration = 0;
        tokenPromise = null;
        reject(new Error('Falha ao autenticar requisição'));
      });
  });

  return tokenPromise;
}

function fetchTrackingService(code: string): Promise<any> {
  /**
   * @param {string} code
   */
  return new Promise((resolve, reject) => {
    // Gera um token para realizar a consulta
    gerarTokenApp()
      .then((token: string) => {
        // Realiza a consulta
        request(`${URL.PROXYAPP_RASTREAR}/${code}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'user-agent': 'Dart/2.18 (dart:io)',
            'app-check-token': token,
          },
        })
          .then((body: any) => {
            // Retorna o resultado da consulta
            return resolve(body.data.objetos[0]);
          })
          .catch((error: any) => {
            reject(error);
          });
      })
      .catch(reject);
  });
}

export default rastrearEncomendas;
