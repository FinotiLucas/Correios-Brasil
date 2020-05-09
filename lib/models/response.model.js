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
  rastreioResponse(responseObject) {
    /**
     * Formata a resposta dosrastreios de encomendas dos correios
     */
    return {
      numero: responseObject.numero._text,
      sigla: responseObject.sigla._text,
      nome: responseObject.nome._text,
      categoria: responseObject.categoria._text,
      evento: [
        {
          tipo: responseObject.evento.tipo._text,
          status: responseObject.evento.status._text,
          data: responseObject.evento.data._text,
          hora: responseObject.evento.hora._text,
          descricao: responseObject.evento.descricao._text,
          local: responseObject.evento.local._text,
          codigo: responseObject.evento.codigo._text,
        },
      ],
    };
  },
};
