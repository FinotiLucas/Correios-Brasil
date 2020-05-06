
  
  

# Correios Brasil

  

<h4  align="center">

<img  src="https://media.giphy.com/media/eRIrROHUPJvgs/giphy.gif"/><br>

<b>Descomplicando os Correios!</b> 🦸‍♂️

</h4>

<p  align="center">

<a  href="https://lucasfinoti.netlify.app">

<img  alt="Made by Lucas Finoti"  src="https://img.shields.io/badge/made%20by-LucasFinoti-red">

</a>

<img  alt="License"  src="https://img.shields.io/badge/license-MIT-red">

</p>

<p  align="center">

[![NPM](https://nodei.co/npm/node-correios.png?mini=true)](https://nodei.co/npm/node-correios/)

</p>

  

<br>

## Como instalar

  

```

npm install correios-brasil --save

```

## Como consultar um CEP

  

``` javascript

  

const { CorreiosBrasil } = require("correios-brasil");

  

let  args = {

// Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200 e etc),

sCepDestino:  "21770200"

};

  

cep = new  CorreiosBrasil(args);

  

cep.consultarCEP()

.then((response) => {

console.log(response.json);

});

  

```

  

### Resposta

  

Com sucesso:

``` javascript

{

cep: '21770-200',

logradouro: 'Rua Claudino Barata',

complemento: '',

bairro: 'Realengo',

localidade: 'Rio de Janeiro',

uf: 'RJ',

unidade: '',

ibge: '3304557',

gia: ''

}

```

  

## Como consultar o preço e as demais informações de uma encomenda

  

``` javascript

  

const { CorreiosBrasil } = require("correios-brasil");

  

let  args = {

// Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200 e etc),

sCepOrigem:  "81200100",

sCepDestino:  "21770200",

nVlPeso:  "1",

nCdFormato:  "1",

nVlComprimento:  "20",

nVlAltura:  "20",

nVlLargura:  "20",

sCdMaoPropria:  "n",

nVlValorDeclarado:  "0",

sCdAvisoRecebimento:  "n",

nCdServico:  "04014",

nVlDiametro:  "0",

};

  

cep = new  CorreiosBrasil(args);

  

cep.calcularPreço()

.then((response) => {

console.log(response.json);

});

```

  

### Resposta

Com sucesso:

``` javascript

{

Codigo: { _text: '04014' },

  

Valor: { _text: '53,10' },

  

PrazoEntrega: { _text: '13' },

  

ValorSemAdicionais: { _text: '53,10' },

  

ValorMaoPropria: { _text: '0,00' },

  

ValorAvisoRecebimento: { _text: '0,00' },

  

ValorValorDeclarado: { _text: '0,00' },

  

EntregaDomiciliar: { _text: 'S' },

  

EntregaSabado: { _text: 'S' },

  

obsFim: {

  

_text: 'O CEP de destino está sujeito a condições especiais de entrega pela ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.'

  

},

  

Erro: { _text: '011' },

  

MsgErro: {

  

_cdata: 'O CEP de destino está sujeito a condições especiais de entrega pela ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.'

  

}

  

}

```

  

# Argumentos para a consulta da API

  

  

-  ``nCdServico`` - **String**

  

Código do serviço:

  

- 04014 = SEDEX à vista

  

- 04065 = SEDEX à vista pagamento na entrega

  

- 04510 = PAC à vista

  

- 04707 = PAC à vista pagamento na entrega

  

- 40169 = SEDEX12 ( à vista e a faturar)

  

- 40215 = SEDEX 10 (à vista e a faturar)

  

- 40290 = SEDEX Hoje Varejo

  

  

-  ``sCepOrigem`` - **String**

  

  

CEP de Origem. Exemplo: **05311900**

  

  

-  ``sCepDestino`` - **String**

  

  

CEP de Destino

  

  

-  ``nVlPeso`` - **String**

  

  

Peso da encomenda, incluindo sua embalagem. O peso deve ser informado em quilogramas. Se o formato for Envelope, o valor máximo permitido será 1 kg

  

  

-  ``nCdFormato`` - **Inteiro**

  

  

Formato da encomenda (incluindo embalagem)

  

- 1 = Formato caixa/pacote

  

- 2 = Formato rolo/prisma

  

- 3 = Envelope

  

  

-  ``nVlComprimento`` - **Decimal**

  

  

Comprimento da encomenda (incluindo embalagem), em centímetros

  

  

-  ``nVlAltura`` - **Decimal**

  

  

Altura da encomenda (incluindo embalagem), em centímetros. Se o formato for envelope, informar zero (0)

  

  

-  ``nVlLargura`` - **Decimal**

  

  

Largura da encomenda (incluindo embalagem), em centímetros

  

  

-  ``nVlDiametro`` - **Decimal**

  

  

Diâmetro da encomenda (incluindo embalagem), em centímetros

  

  

-  ``sCdMaoPropria`` - **String**

  

Indica se a encomenda será entregue com o serviço adicional mão própria

  

- S = sim

  

- N = não **PADRÃO**

  

  

-  ``nVlValorDeclarado`` - **Decimal**

  

Indica se a encomenda será entregue com o serviço adicional valor declarado. Neste campo deve ser apresentado o valor declarado desejado, em Reais

  

  

-  ``sCdAvisoRecebimento`` - **String**

  

Indica se a encomenda será entregue com o serviço adicional mão própria

  

- S = sim

  

- N = não **PADRÃO**

  
  

### 👍 Contribuição

  

Want to contribute? Great!

  

1. Fork it

2. Create your feature branch (git checkout -b my-new-feature)

3. Commit your changes (git commit -m 'Add some feature')

4. Push to the branch (git push origin my-new-feature)

5. Create new Pull Request

  
  

### License

----

  

MIT License

  

Copyright (c) 2020 Lucas Finoti

  

[See more about the license][LICENSE]

  

[LICENSE]: <https://github.com/FinotiLucas/Correios-Brasil/blob/master/LICENSE>