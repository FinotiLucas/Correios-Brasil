const { CorreiosBrasil } = require("./classes/cep");

let args = {
  sCepOrigem: "81200100",
  sCepDestino: "21770200",
  nVlPeso: "1",
  nCdFormato: "1",
  nVlComprimento: "20",
  nVlAltura: "20",
  nVlLargura: "20",
  sCdMaoPropria: "n",
  nVlValorDeclarado: "0",
  sCdAvisoRecebimento: "n",
  nCdServico: "04014",
  nVlDiametro: "0",
};

cep = new CorreiosBrasil(args);

cep.calcularPreço().then((response) => {
  console.log(response.json);
});
