const { consultarCep } = require("./features/cep");
const { calcularPrecoPrazo } = require("./features/precos");
const { rastrearEncomendas } = require("./features/rastreio");

module.exports = {
  consultarCep,
  calcularPrecoPrazo,
  rastrearEncomendas,
};
