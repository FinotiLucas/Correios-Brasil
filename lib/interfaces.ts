export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
}

export interface PrecoPrazoRequest {
  sCepOrigem: string;
  sCepDestino: string;
  nVlPeso: string;
  nCdFormato: string;
  nVlComprimento: string;
  nVlAltura: string;
  nVlLargura: string;
  nCdServico: Array<string>;
  nVlDiametro: string;
  nCdEmpresa?: string;
  sDsSenha?: string;
  sCdMaoPropria?: string;
  nVlValorDeclarado?: string | number;
  sCdAvisoRecebimento?: string;
  nIndicaCalculo?: string | number;
}

export interface PrecoPrazoEvent {
  Codigo: string;
  Valor: string;
  PrazoEntrega: string;
  ValorSemAdicionais: string;
  ValorMaoPropria: string;
  ValorAvisoRecebimento: string;
  ValorDeclarado: string;
  EntregaDomiciliar: string;
  EntregaSabado: string;
  obsFim: string;
  Erro: string;
  MsgErro: string;
}

export interface PrecoPrazoResponse {
  [name: string]: {
    Codigo: string;
    Valor: string;
    PrazoEntrega: string;
    ValorSemAdicionais: string;
    ValorMaoPropria: string;
    ValorAvisoRecebimento: string;
    ValorDeclarado: string;
    EntregaDomiciliar: string;
    EntregaSabado: string;
    obsFim: string;
    Erro: string;
    MsgErro: string;
  };
}

export interface RastreioEvent {
  status: string;
  data: string;
  hora: string;
  origem?: string;
  destino?: string;
  local?: string;
}

export interface RastreioResponse {
  [name: string]: {
    status: string;
    data: string;
    hora: string;
    origem?: string;
    destino?: string;
    local?: string;
  };
}
