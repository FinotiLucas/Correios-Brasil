import { expect } from 'chai'
import fs from 'fs'
import path from 'path'

import { sanitizeCep } from '../lib/utils/validation'
import { convertArrayBufferToString, convertXMLStringToJson } from '../lib/utils/parsers'

describe('Sanitize Cep', () => {
  it('Cep com tamanho inválido', () => {
    const invalidCepLength = '123213'
    expect(() => sanitizeCep(invalidCepLength)).to.throw()
  })

  it('Cep com máscara', () => {
    const maskedCep = '30140-010'
    expect(sanitizeCep(maskedCep)).to.be.equals('30140010')
  })

  it('Cep sem máscara', () => {
    const notMaskedCep = '30140010'
    expect(sanitizeCep(notMaskedCep)).to.be.equals('30140010')
  })
})

describe('Parsers', () => {
  it('Teste em converter xml para Json', () => {
    const xmlPath = path.join(__dirname, 'static', 'stringpreco.xml')
    fs.readFile(xmlPath, 'utf-8', (err, buffer) => {
      const json = convertXMLStringToJson(buffer)
      expect(json).to.be.an('object')
      expect(json.Servicos.cServico).to.be.an('object')
    })
  })

  it('Teste para converter ArrayBuffer para String', () => {
    const htmlPath = path.join(__dirname, 'static', 'rastreio.html')
    fs.readFile(htmlPath, 'utf-8', (err, buffer) => {
      const arrayBuffer = str2ab(buffer)
      const converted = convertArrayBufferToString(arrayBuffer, 'utf-8')
      expect(converted.length).to.be.equals(49934)
      expect(converted).to.be.an('string')
    })

    function str2ab(str) {
      var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
      var bufView = new Uint16Array(buf);
      for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }

  })

})


