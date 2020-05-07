module.exports = {
  calcularPreçoModel(obj) {
    obj = {
      Codigo: obj.Codigo._text,
      Valor: obj.Valor._text,
      PrazoEntrega: obj.PrazoEntrega._text,
      ValorSemAdicionais: obj.ValorSemAdicionais._text,
      ValorMaoPropria: obj.ValorMaoPropria._text,
      ValorAvisoRecebimento: obj.ValorAvisoRecebimento._text,
      ValorDeclarado: obj.ValorValorDeclarado._text,
      EntregaDomiciliar: obj.EntregaDomiciliar._text,
      EntregaSabado: obj.EntregaSabado._text,
      obsFim: obj.obsFim._text,
      Erro: obj.Erro._text,
      MsgErro: obj.MsgErro._cdata,
    };
    return obj;
  },
  rastreioModel(obj) {
    obj = {
      numero: obj.numero._text,
      sigla: obj.sigla._text,
      nome: obj.nome._text,
      categoria: obj.categoria._text,
      evento: [
        {
          tipo: obj.evento.tipo._text,
          status: obj.evento.status._text,
          data: obj.evento.data._text,
          hora: obj.evento.hora._text,
          descricao: obj.evento.descricao._text,
          local: obj.evento.local._text,
          codigo: obj.evento.codigo._text,
        }
      ]
    };
    return obj;
  },
};
