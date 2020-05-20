import iconv from 'iconv-lite'
import convert from 'xml-js'

const convertArrayBufferToString = (arrayBuffer: ArrayBuffer, encoding: string): string => {
  return iconv.decode(Buffer.from(arrayBuffer), encoding).toString()
}

const convertXMLStringToJson = (xmlString: string): any => JSON.parse(convert.xml2json(xmlString, { compact: true }))

export { convertArrayBufferToString, convertXMLStringToJson }