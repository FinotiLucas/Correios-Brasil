import iconv from 'iconv-lite';
import convert from 'xml-js';

function convertArrayBufferToString(
  arrayBuffer: ArrayBuffer,
  encoding: string,
): string {
  return iconv.decode(Buffer.from(arrayBuffer), encoding).toString();
}

function convertXMLStringToJson(xmlString: string): any {
  return JSON.parse(convert.xml2json(xmlString, { compact: true }));
}

export { convertArrayBufferToString, convertXMLStringToJson };
