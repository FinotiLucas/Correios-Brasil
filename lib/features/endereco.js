/**
 * Funções responsáveis por operações de endereço
 */
 const { request } = require('../utils/request');
 const { URL } = require('../utils/URL');
 
 module.exports = {
   consultarEndereco(uf, municipio, logradouro) {
     /**
      * @param {string} uf
      * @param {string} municipio
      * @param {string} logradouro
      * Função responsável por consultar as informações do ENDEREÇO informado com
      * base no serviço VIACEP do IBGE
      */
 
     return new Promise((resolve, reject) =>
       request(`${URL.BASECEP}/${uf}/${municipio}/${logradouro}/json`, {
         method: 'GET',
         headers: {
           'content-type': 'application/json',
         },
       }).then((body) => {
         if (body.erro) reject(Error(`Endereço: ${logradouro} - ${municipio}/${uf} não existe na nossa base`));
         return resolve(body);
       }),
     );
   },
 };
 