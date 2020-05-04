const fetch = require("node-fetch");

const str = "21.aaSS@- +$#¨%¨*¨&(dsdsdfdsf 770-200";

function cep(cep) {
  function sanitization(cep) {
    const result = cep.replace(/[^0-9]|[/ /]/g, "");
    isValid = validation(result);
    try {
      if (isValid) {
        return result;
      }
    } catch (err) {
      console.error();
    }
  }

  function validation(sanitizedZip) {
    if (sanitizedZip.length === 8) {
      return true;
    } else return false;
  }

  sanitizedZip = sanitization(cep);

  //nresult = https://viacep.com.br/ws/01001000/json/?callback=callback_name

  return sanitizedZip;
}

const url = `https://viacep.com.br/ws/${cep(str)}/json`;

fetch(url)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function (data) {
    console.log(data);
  });

const data = console.log(fetch(url));
