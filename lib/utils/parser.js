const iconv = require("iconv-lite");
const convert = require("xml-js");

module.exports = {
  convertArrayBufferToString(arrayBuffer, encoding) {
    return iconv.decode(Buffer.from(arrayBuffer), encoding).toString();
  },

  convertXMLStringToJson(xmlString) {
    return JSON.parse(convert.xml2json(xmlString, { compact: true }));
  },
};
