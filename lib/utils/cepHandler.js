module.exports = {
  sanitization(cep) {
    /**
     * Função responsável por realizar a higienização dos ceps, deixando apenas caracteres válidos e do comprimento correto.
     */
    const sanitizedZip = cep.replace(/[^0-9]|[/ /]/g, "");
    return sanitizedZip.length === 8
      ? sanitizedZip
      : console.log("Cep inválido:", sanitizedZip);
  },
};
