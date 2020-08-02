const iconv = require("iconv-lite");
const convert = require("xml-js");

module.exports = {
  convertArrayBufferToString(arrayBuffer, encoding) {
    //Converte o Array Buffer para String com o encoding escolhido
    return iconv.decode(Buffer.from(arrayBuffer), encoding).toString();
  },

  convertXMLStringToJson(xmlString) {
    //Converte o XLM para Json
    return JSON.parse(convert.xml2json(xmlString, { compact: true }));
  },
};
