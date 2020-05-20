import cheerio from 'cheerio'

import { request } from '../utils/request'
import { convertArrayBufferToString } from '../utils/parsers'
import URL from '../URL'

interface RastreioEvent {
  status: string;
  data: string;
  origem?: string;
  destino?: string;
  local?: string;
}

interface RastreioResponse {
  events: Array<RastreioEvent>;
}

/**
 * 
 * @param {string} code 
 */

const rastrearEncomendas = (code: string) : Promise<void | RastreioResponse> => {
  return new Promise((resolve, reject) => {
    request(`${URL.BASERASTREIO}/${code}`, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'content-type': 'text; charset=utf-8',
        'cache-control': 'no-cache'
      }
    }).then(arrayBuffer => {
      resolve(convertHtmlToJson(convertArrayBufferToString(arrayBuffer, 'utf-8')))
    })
  })
}

const convertHtmlToJson = (htmlString: string) : RastreioResponse => {
  const html = cheerio.load(htmlString)
  const elemArray = []
  html('ul.linha_status').each((_, elem) => {
    elemArray.push(elem)
  })
  const elemMap = elemArray.map((elem) => {
    const mapObj = {} as RastreioEvent
    html(elem).find('li').each((_, liElem) => {
      const text = html(liElem).text()
      if (text) {
        if (text.includes('Status')) mapObj.status = text
        if (text.includes('Data')) mapObj.data = text
        if (text.includes('Local')) mapObj.local = text
        if (text.includes('Origem')) mapObj.origem = text
        if (text.includes('Destino')) mapObj.destino = text
      }
    })
    return mapObj
  })

  return { events: elemMap.reverse() }
}

export default rastrearEncomendas