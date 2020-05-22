import querystring from 'querystring'

import { sanitizeCep } from '../utils/validation'
import { request } from '../utils/request'
import { convertArrayBufferToString, convertXMLStringToJson } from '../utils/parsers'
import URL from '../URL'
import { PrecoPrazoRequest, PrecoPrazoResponse } from '../Interfaces'

/**
 * 
 * @param {PrecoPrazoRequest} precoPrazo 
 */

const calcularPrecoPrazo = (precoPrazo: PrecoPrazoRequest): Promise<void | PrecoPrazoResponse> => {
  return new Promise((resolve, reject) => {
    const qs : any = {...precoPrazo, ...{
      sCepOrigem: sanitizeCep(precoPrazo.sCepOrigem),
      sCepDestino: sanitizeCep(precoPrazo.sCepDestino),
      nCdEmpresa: '',
      sDsSenha: '',
      sCdMaoPropria: 'n',
      nVlValorDeclarado: 0,
      sCdAvisoRecebimento: 'n',
      StrRetorno: 'xml',
      nIndicaCalculo: 3
    }}
    
    return request(`${URL.BASECORREIOS}?${querystring.stringify(qs)}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(arrayBuffer => {
      const rawJson = convertXMLStringToJson(convertArrayBufferToString(arrayBuffer, 'iso-8859-1'))
      resolve(convertJsonToPrazoPrecoResponse(rawJson.Servicos.cServico))
    })
  })
}

const convertJsonToPrazoPrecoResponse = (obj: any): PrecoPrazoResponse => {
  const precoPrazoResponse = Object.keys(obj).reduce((acc: any, key) => {
    acc[key] = obj[key]._text ? obj[key]._text : obj[key]._cdata
    return acc
  }, {} as PrecoPrazoResponse)
  return precoPrazoResponse
}

export default calcularPrecoPrazo