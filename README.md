# Correios Brasil -- VERSÃO 2.2.2

<h4  align="center">

<img  src="https://media.giphy.com/media/nbX0ijnZwU33wY6Wwo/giphy.gif"/><br>

<b>Descomplicando os Correios!</b> 📬

</h4>

<p  align="center">

<a  href="https://lucasfinoti.netlify.app">

<img  alt="Made by Lucas Finoti"  src="https://img.shields.io/badge/made%20by-LucasFinoti-red">

</a>

<img  alt="License"  src="https://img.shields.io/badge/license-Apache 2.0-red">

</p>

<p  align="center">

[![NPM](https://nodei.co/npm/correios-brasil.png?mini=true)](https://www.npmjs.com/package/correios-brasil/)

</p>

<br>

# O que é o Correios Brasil ?

O Correios Brasil é uma ferramenta completa para quem procura facilidade para sua aplicação, otimizando sua loja virtual e seu serviço como: consultar informações sobre o CEP, calcular o preço e os prazos das entregas das encomendas e também realizar seu rastreio tudo em um único lugar, agilizando assim os processos e demandas do dia a dia. Portanto, poupando seu tempo, por isso aproveite o pacote e não esqueça de deixar uma estrela no repositório, obrigado!

## Medium storie explicando o pacote.

<a  href="https://medium.com/@finoti.limalucas/correios-javascript-conhe%C3%A7a-o-correios-brasil-a-solu%C3%A7%C3%A3o-mais-completa-para-trabalhar-com-d9121b745e27">

<img  alt="License"  height="56"  src="https://www.thelogocreative.co.uk/wp-content/uploads/2017/08/1_uLuWzCXfq2rt1t_TkuLB8A.png">

</a>

## O que o Correios-Brasil é capaz de fazer ?

- Obter informações de um CEP específico (Em dev: informações de multiplos CEPs);
- Cálcular preços e prazos para uma entrega em todos os serviços dos correios (PAC, SEDEX e etc);
- Rastreio uma ou mais encomendas.

## Como instalar

```
npm install correios-brasil --save

```

### Typescript

Por padrão essa bibilioteca inclui uma definição de tipo para o Typescript.
Para utilizá-la, basta importar da seguinte maneira.

```typescript
import {calcularPrecoPrazo, consultarCep, rastrearEncomendas} from 'correios-brasil';
```

## Como consultar um CEP

```javascript
const { consultarCep } = require('correios-brasil');

// Cep pode ser String ou Number
const cep = '21770200'; // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve

consultarCep(cep).then((response) => {
  console.log(response);
});
```

### Resposta

```javascript
{
  cep: '21770-200',
  logradouro: 'Rua Claudino Barata',
  complemento: '',
  bairro: 'Realengo',
  localidade: 'Rio de Janeiro',
  uf: 'RJ',
  ibge: '3304557',
  gia: '',
  ddd: '21',
  siafi: '6001'
}
```

## Como consultar o preço e o prazo de entrega de uma encomenda

```javascript
const { calcularPrecoPrazo } = require('correios-brasil');

let args = {
  // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
  sCepOrigem: '81200100',
  sCepDestino: '21770200',
  nVlPeso: '1',
  nCdFormato: '1',
  nVlComprimento: '20',
  nVlAltura: '20',
  nVlLargura: '20',
  nCdServico: ['04014', '04510'], //Array com os códigos de serviço
  nVlDiametro: '0',
};

calcularPrecoPrazo(args).then((response) => {
  console.log(response);
});
```

### Resposta

```javascript
[
  {
    Codigo: '04014',
    Valor: '53,10',
    PrazoEntrega: '8',
    ValorSemAdicionais: '53,10',
    ValorMaoPropria: '0,00',
    ValorAvisoRecebimento: '0,00',
    ValorDeclarado: '0,00',
    EntregaDomiciliar: 'S',
    EntregaSabado: 'S',
    obsFim:
      'O CEP de destino está sujeito a condições especiais de entrega  pela  ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.',
    Erro: '011',
    MsgErro:
      'O CEP de destino está sujeito a condições especiais de entrega  pela  ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.',
  },
  {
    Codigo: '04510',
    Valor: '27,80',
    PrazoEntrega: '13',
    ValorSemAdicionais: '27,80',
    ValorMaoPropria: '0,00',
    ValorAvisoRecebimento: '0,00',
    ValorDeclarado: '0,00',
    EntregaDomiciliar: 'S',
    EntregaSabado: 'S',
    obsFim:
      'O CEP de destino está sujeito a condições especiais de entrega  pela  ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.',
    Erro: '011',
    MsgErro:
      'O CEP de destino está sujeito a condições especiais de entrega  pela  ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.',
  },
];
```

## Como rastrear uma ou mais encomendas

```javascript
const { rastrearEncomendas } = require('correios-brasil');

let codRastreio = ['PW639018542BR', 'PW935793588BR']; // array de códigos de rastreios

rastrearEncomendas(codRastreio).then((response) => {
  console.log(response);
});
```

### Resposta

```javascript
[
  [
    {
      status: 'Objeto postado',
      data: '14/04/2020',
      hora: '14:28',
      local: 'AGF VILA PREL - Sao Paulo / SP',
    },
    {
      status: 'Objeto encaminhado',
      data: '15/04/2020',
      hora: '09:03',
      origem: 'AGF VILA PREL - Sao Paulo / SP',
      destino: 'CTE CAJAMAR - Cajamar / SP',
    },
    {
      status: 'Objeto encaminhado',
      data: '15/04/2020',
      hora: '22:18',
      origem: 'CTE CAJAMAR - Cajamar / SP',
      destino: 'CTE BENFICA - Rio De Janeiro / RJ',
    },
    {
      status: 'Objeto encaminhado',
      data: '16/04/2020',
      hora: '10:04',
      origem: 'CTE BENFICA - Rio De Janeiro / RJ',
      destino: 'CDD ITAGUAI - Itaguai / RJ',
    },
    {
      status: 'Objeto saiu para entrega ao destinatário',
      data: '17/04/2020',
      hora: '08:06',
      local: 'CDD ITAGUAI - Itaguai / RJ',
    },
    {
      status: 'Objeto entregue ao destinatário',
      data: '17/04/2020',
      hora: '11:12',
      local: 'CDD ITAGUAI - Itaguai / RJ',
    },
  ],
    [
      {
        status: 'Objeto postado após o horário limite da unidade',
        data: '05/05/2020',
        hora: '18:17',
        local: 'AGF CIDADE DAS ROSAS - Sapiranga / RS',
      },
      {
        status: 'Objeto encaminhado',
        data: '05/05/2020',
        hora: '18:29',
        origem: 'AGF CIDADE DAS ROSAS - Sapiranga / RS',
        destino: 'CTCE PORTO ALEGRE - Porto Alegre / RS',
      },
      {
        status: 'Objeto encaminhado',
        data: '09/05/2020',
        hora: '03:05',
        origem: 'CTE CAJAMAR - Cajamar / SP',
        destino: 'CTE BENFICA - Rio De Janeiro / RJ',
      },
      {
        status: 'Objeto encaminhado',
        data: '12/05/2020',
        hora: '13:54',
        origem: 'CTE BENFICA - Rio De Janeiro / RJ',
        destino: 'CDD ITAGUAI - Itaguai / RJ',
      },
      {
        status: 'Objeto saiu para entrega ao destinatário',
        data: '13/05/2020',
        hora: '10:18',
        local: 'CDD ITAGUAI - Itaguai / RJ',
      },
      {
        status: 'Objeto entregue ao destinatário',
        data: '13/05/2020',
        hora: '13:22',
        local: 'CDD ITAGUAI - Itaguai / RJ',
      },
    ];
]
```

# Argumentos para a consulta da API

- `codRastreio` - **Array[String]**

String com o código de rastreio

- `nCdServico` - **Array[String]**

Código do serviço:

- 04014 = SEDEX à vista

- 04065 = SEDEX à vista pagamento na entrega

- 04510 = PAC à vista

- 04707 = PAC à vista pagamento na entrega

- 40169 = SEDEX12 ( à vista e a faturar)

- 40215 = SEDEX 10 (à vista e a faturar)

- 40290 = SEDEX Hoje Varejo

- `sCepOrigem` - **String/Number**

CEP de Origem. Exemplo: **05311900**

- `sCepDestino` - **String/Number**

CEP de Destino

- `nVlPeso` - **String**

Peso da encomenda, incluindo sua embalagem. O peso deve ser informado em quilogramas. Se o formato for Envelope, o valor máximo permitido será 1 kg

- `nCdFormato` - **Inteiro**

Formato da encomenda (incluindo embalagem)

- 1 = Formato caixa/pacote

- 2 = Formato rolo/prisma

- 3 = Envelope

- `nVlComprimento` - **Decimal**

Comprimento da encomenda (incluindo embalagem), em centímetros

- `nVlAltura` - **Decimal**

Altura da encomenda (incluindo embalagem), em centímetros. Se o formato for envelope, informar zero (0)

- `nVlLargura` - **Decimal**

Largura da encomenda (incluindo embalagem), em centímetros

- `nVlDiametro` - **Decimal**

Diâmetro da encomenda (incluindo embalagem), em centímetros

- `sCdMaoPropria` - **String**

Indica se a encomenda será entregue com o serviço adicional mão própria

- S = sim

- N = não **PADRÃO**

- `nVlValorDeclarado` - **Decimal**

Indica se a encomenda será entregue com o serviço adicional valor declarado. Neste campo deve ser apresentado o valor declarado desejado, em Reais

- `sCdAvisoRecebimento` - **String**

Indica se a encomenda será entregue com o serviço adicional mão própria

- S = sim

- N = não **PADRÃO**


### O que está em desenvolvimento ?

- Receber respostas de multiplas API's e retornar a primeira resposta 🟡.

- Atualizar o package.json e o README.md 🟢.

### :recycle: Como contribuir

- Fork esse repositório;
- Crie uma branch com a sua feature: `git checkout -b my-feature`
- Commit suas mudanças: `git commit -m 'feat: My new feature'`
- Push a sua branch: `git push origin my-feature`

### :memo: Licença

Apache License 2.0

Copyright (c) 2020 Lucas Finoti

[See more about the license][license]

[license]: https://github.com/FinotiLucas/Correios-Brasil/blob/master/LICENSE





## 💪 Contribuidores

| [<img src="https://avatars0.githubusercontent.com/u/42827195?v=3&s=115" width="115"><br><sub>@jonabf1</sub>](https://github.com/jonabf1) | [<img src="https://avatars0.githubusercontent.com/u/18602545?v=3&s=115" width="115"><br><sub>@francopan</sub>](https://github.com/francopan) |
|--|--|



## 🚀 Autor

| [<img src="https://avatars0.githubusercontent.com/u/42899930?v=3&s=115"><br><sub>@finotilucas</sub>](https://github.com/finotilucas) |
|--|
