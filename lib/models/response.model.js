module.exports = {
  cepResponse(responseObject) {
    /**
     * Formata a resposta vinda do serviço Via Cep
     */

    return {
      cep: responseObject.cep.replace("-", ""),
      state: responseObject.uf,
      city: responseObject.localidade,
      neighborhood: responseObject.bairro,
      street: responseObject.logradouro,
    };
  },

  correiosResponse(responseObject) {
    /**
     * Formata a resposta dos dados de prazos e preços vindos dos correios
     */

    return {
      Codigo: responseObject.Codigo._text,
      Valor: responseObject.Valor._text,
      PrazoEntrega: responseObject.PrazoEntrega._text,
      ValorSemAdicionais: responseObject.ValorSemAdicionais._text,
      ValorMaoPropria: responseObject.ValorMaoPropria._text,
      ValorAvisoRecebimento: responseObject.ValorAvisoRecebimento._text,
      ValorDeclarado: responseObject.ValorValorDeclarado._text,
      EntregaDomiciliar: responseObject.EntregaDomiciliar._text,
      EntregaSabado: responseObject.EntregaSabado._text,
      obsFim: responseObject.obsFim._text,
      Erro: responseObject.Erro._text,
      MsgErro: responseObject.MsgErro._cdata,
    };
  },
};
