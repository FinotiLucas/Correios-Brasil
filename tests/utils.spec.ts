import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import { sanitization } from '../lib/utils/validation';
import {
  convertArrayBufferToString,
  convertXMLStringToJson,
} from '../lib/utils/parser';

describe('Sanitize Cep', () => {
  it('Cep com tamanho inválido', () => {
    const invalidCepLength = '123213';

    expect(() => sanitization(invalidCepLength)).to.throw();
  });

  it('Cep com máscara', () => {
    const maskedCep = '21770-200';

    expect(sanitization(maskedCep)).to.be.equals('21770200');
  });

  it('Cep sem máscara', () => {
    const notMaskedCep = '21770200';

    expect(sanitization(notMaskedCep)).to.be.equals('21770200');
  });
});

describe('Parsers', () => {
  it('Teste em converter xml para Json', () => {
    const xmlPath = path.join(__dirname, 'static', 'stringpreco.xml');

    fs.readFile(xmlPath, 'utf-8', (err, buffer) => {
      const json = convertXMLStringToJson(buffer);
      expect(json).to.be.an('object');
      expect(json.Servicos.cServico).to.be.an('object');
    });
  });

  it('Teste para converter ArrayBuffer para String', () => {
    const htmlPath = path.join(__dirname, 'static', 'rastreio.txt');

    fs.readFile(htmlPath, 'utf-8', (err, buffer) => {
      const arrayBuffer = stringToBuffer(buffer);
      const converted = convertArrayBufferToString(arrayBuffer, 'utf-8');
      expect(converted.length).to.be.equals(49934);
      expect(converted).to.be.an('string');
    });

    function stringToBuffer(str: string) {
      const buf = new ArrayBuffer(str.length * 2);
      const bufView = new Uint16Array(buf);

      for (
        let strIndex = 0, strLen = str.length;
        strIndex < strLen;
        strIndex++
      ) {
        bufView[strIndex] = str.charCodeAt(strIndex);
      }
      return buf;
    }
  });
});
