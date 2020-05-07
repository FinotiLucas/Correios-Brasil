module.exports = {
  calcularPreçoModel(obj) {
    obj = {
      Codigo: obj.Codigo._text,
      Valor: obj.Valor._text,
      PrazoEntrega: obj.PrazoEntrega._text,
      ValorSemAdicionais: obj.ValorSemAdicionais._text,
      ValorMaoPropria: obj.ValorMaoPropria._text,
      ValorAvisoRecebimento: obj.ValorAvisoRecebimento._text,
      ValorValorDeclarado: obj.ValorValorDeclarado._text,
      EntregaDomiciliar: obj.EntregaDomiciliar._text,
      EntregaSabado: obj.EntregaSabado._text,
      obsFim: obj.obsFim._text,
      Erro: obj.Erro._text,
      MsgErro: obj.MsgErro._cdata,
    };
    return obj;
  },
  rastreioModel(response) {
    let obj = {
      tipo: response.tipo._text,
      status: response.status._text,
      data: response.data._text,
      hora: response.hora._text,
      descricao: response.descricao._text,
      local: response.local._text,
      codigo: response.codigo._text,
    };
    return obj;
  },
};
