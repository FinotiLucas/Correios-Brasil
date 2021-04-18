function sanitization(cep: String): String {
  const regex = new RegExp(/[^0-9]|[/ /]/g, '');
  const sCep = cep.trim().replace(regex, '');
  if (sCep.length !== 8) throw Error(`Cep: ${cep} inválido!`);
  return sCep;
}

export { sanitization };
