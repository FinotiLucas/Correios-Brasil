module.exports = {
  sanitization(cep) {
    /**
     * @param {string} cep
     * Função responsável por realizar a higienização dos ceps, deixando apenas caracteres válidos e do comprimento correto.
     */
    const regex = new RegExp(/[^0-9]|[/ /]/g, "");
    const sCep = cep.toString().trim().replace(regex, "");
    if (sCep.length !== 8) throw Error(`Cep: ${cep} inválido!`);
    return sCep;
  },
};
