
  

# Correios Brasil

  

  

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


## Vídeo Tutorial



[<img src="https://img.youtube.com/vi/Nefhor-MDs8/maxresdefault.jpg" width="100%" height="512">](https://youtu.be/Nefhor-MDs8)


  

## Medium storie explicando o pacote.

<a  href="https://medium.com/@finoti.limalucas/correios-javascript-conhe%C3%A7a-o-correios-brasil-a-solu%C3%A7%C3%A3o-mais-completa-para-trabalhar-com-d9121b745e27">

<img  alt="License"  height="56"  src="https://www.thelogocreative.co.uk/wp-content/uploads/2017/08/1_uLuWzCXfq2rt1t_TkuLB8A.png">

</a>  
  

## Como instalar

  
  

```
npm install correios-brasil --save
 
```

  

## Como consultar um CEP

  

``` javascript
const correios = require("correios-brasil");

  
const  cep = '21770200'

correios.consultarCep(cep).then(res => console.log(res)).catch(err => console.error(err))
```

### Resposta

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

## Como consultar o preço e o prazo de entrega de uma encomenda


``` javascript
const correios = require("correios-brasil"); 

let  args = {
  // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
  sCepOrigem:  "81200100",
  sCepDestino:  "21770200",
  nVlPeso:  "1",
  nCdFormato:  "1",
  nVlComprimento:  "20",
  nVlAltura:  "20",
  nVlLargura:  "20",
  nCdServico:  "04014",
  nVlDiametro:  "0",
};

calcularPrecoPrazo(args).then(res => console.info(res)).catch(err => console.log(err))

```  

### Resposta

``` javascript
{
  Codigo: '04014',
  Valor: '53,10',
  PrazoEntrega: '13',
  ValorSemAdicionais: '53,10',
  ValorMaoPropria: '0,00',
  ValorAvisoRecebimento: '0,00',
  ValorValorDeclarado: '0,00',
  EntregaDomiciliar: 'S',
  EntregaSabado: 'S',
  obsFim: 'O CEP de destino está sujeito a condições especiais de entrega pela ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.',
  Erro: '011',
  MsgErro: 'O CEP de destino está sujeito a condições especiais de entrega pela ECT e será realizada com o acréscimo de até 7 (sete) dias úteis ao prazo regular.'
}
```

## Como rastrear uma encomenda
  

``` javascript
const correios = require('correios-brasil')

let  codRastreio = "PW639018542BR"

correios.rastrearEncomendas(codRastreio).then(res => console.log(res))
```

  

### Resposta

``` javascript
{
  events: [
    {
      status: 'Status: Objeto encaminhado ',
      data: 'Data  : 15/04/2020 | Hora: 09:03',
      origem: 'Origem: AGF VILA PREL - Sao Paulo / SP',
      destino: 'Destino: CTE CAJAMAR - Cajamar / SP'
    },
    {
      status: 'Status: Objeto encaminhado ',
      data: 'Data  : 15/04/2020 | Hora: 22:18',
      origem: 'Origem: CTE CAJAMAR - Cajamar / SP',
      destino: 'Destino: CTE BENFICA - Rio De Janeiro / RJ'      
    },
    {
      status: 'Status: Objeto encaminhado ',
      data: 'Data  : 16/04/2020 | Hora: 10:04',
      origem: 'Origem: CTE BENFICA - Rio De Janeiro / RJ',       
      destino: 'Destino: CDD ITAGUAI - Itaguai / RJ'
    },
    {
      status: 'Status: Objeto saiu para entrega ao destinatário',
      data: 'Data  : 17/04/2020 | Hora: 08:06',
      local: 'Local: CDD ITAGUAI - Itaguai / RJ'
    },
    {
      status: 'Status: Objeto entregue ao destinatário',
      data: 'Data  : 17/04/2020 | Hora: 11:12',
      local: 'Local: CDD ITAGUAI - Itaguai / RJ'
    },
    {
      status: 'Status: Objeto entregue ao destinatário',
      data: 'Data  : 17/04/2020 | Hora: 11:12',
      local: 'Local: CDD ITAGUAI - Itaguai / RJ'
    }
  ]
}
```

  

# Argumentos para a consulta da API

  

  

-  ``codRastreio`` - **String**

  

String com o código de rastreio

  

  

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

  

### O que está em desenvolvimento ?

  

- Receber respostas de multiplas API's e retornar a primeira resposta 🟡.

- Atualizar o package.json e o README.md 🟢.

  

### 👍 Contribuição

  

  

  

Want to contribute? Great!

  

  

  

1. Fork it

  

  

2. Create your feature branch (git checkout -b my-new-feature)

  

  

3. Commit your changes (git commit -m 'Add some feature')

  

  

4. Push to the branch (git push origin my-new-feature)

  

  

5. Create new Pull Request

  

  

  

### License

  

  

----

  

  

  

Apache License 2.0
  

  

  

Copyright (c) 2020 Lucas Finoti

  

  

  

[See more about the license][LICENSE]

  

  

  

[LICENSE]: <https://github.com/FinotiLucas/Correios-Brasil/blob/master/LICENSE>