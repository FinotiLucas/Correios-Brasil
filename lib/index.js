const { consultarCep } = require('./features/cep');
const { consultarEndereco } = require('./features/endereco');
const { calcularPrecoPrazo } = require('./features/precos');
const { rastrearEncomendas } = require('./features/rastreio');

module.exports = {
  consultarCep,
  consultarEndereco,
  calcularPrecoPrazo,
  rastrearEncomendas,
};
